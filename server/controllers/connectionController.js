const User = require("../models/MillPrimeUser");
const Connection = require("../models/Connection");
const mongoose = require("mongoose");

const POPULATE_FIELDS = "name username profilePic prime roles business.industry";

const isValidId = (id, label, res) => {
  if (!mongoose.isValidObjectId(id)) {
    res.status(400).json({ success: false, message: `Invalid ${label}` });
    return false;
  }
  return true;
};

const sendRequest = async (req, res) => {
  const { recipientId } = req.body;

  if (!recipientId) {
    return res.status(400).json({ success: false, message: "recipientId is required" });
  }

  if (recipientId === req.userId) {
    return res.status(400).json({ success: false, message: "Cannot connect with yourself" });
  }

  if (!isValidId(recipientId, "recipientId", res)) return;

  try {
    const recipient = await User.findById(recipientId);
    if (!recipient) {
      return res.status(404).json({ success: false, message: "Recipient not found" });
    }

    const existing = await Connection.findOne({
      $or: [
        { requester: req.userId, recipient: recipientId },
        { requester: recipientId, recipient: req.userId },
      ],
      status: { $in: ["pending", "accepted"] },
    });
    if (existing) {
      return res.status(409).json({ success: false, message: "Connection already exists" });
    }

    // Reuse a declined record to avoid E11000 on the unique pairKey index
    let connection = await Connection.findOneAndUpdate(
      {
        $or: [
          { requester: req.userId, recipient: recipientId },
          { requester: recipientId, recipient: req.userId },
        ],
        status: "declined",
      },
      { $set: { requester: req.userId, recipient: recipientId, status: "pending" } },
      { new: true }
    );

    if (!connection) {
      connection = await Connection.create({
        requester: req.userId,
        recipient: recipientId,
        status: "pending",
      });
    }

    res.status(201).json({ success: true, connection });
  } catch (err) {
    if (err.code === 11000) {
      return res.status(409).json({ success: false, message: "Connection already exists" });
    }
    res.status(500).json({ success: false, message: err.message });
  }
};

const handlePendingAction = (newStatus) => async (req, res) => {
  if (!isValidId(req.params.id, "connection id", res)) return;
  try {
    const connection = await Connection.findById(req.params.id);
    if (!connection) {
      return res.status(404).json({ success: false, message: "Connection not found" });
    }
    if (connection.recipient.toString() !== req.userId) {
      return res.status(403).json({ success: false, message: "Not authorized" });
    }
    if (connection.status !== "pending") {
      return res.status(400).json({ success: false, message: "Connection is not pending" });
    }
    await Connection.findByIdAndUpdate(req.params.id, { status: newStatus });
    res.status(200).json({ success: true });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

const acceptRequest = handlePendingAction("accepted");
const declineRequest = handlePendingAction("declined");

const removeConnection = async (req, res) => {
  if (!isValidId(req.params.id, "connection id", res)) return;
  try {
    const connection = await Connection.findById(req.params.id);
    if (!connection) {
      return res.status(404).json({ success: false, message: "Connection not found" });
    }
    if (
      connection.requester.toString() !== req.userId &&
      connection.recipient.toString() !== req.userId
    ) {
      return res.status(403).json({ success: false, message: "Not authorized" });
    }
    if (connection.status !== "accepted") {
      return res.status(400).json({ success: false, message: "Can only remove accepted connections" });
    }
    await connection.deleteOne();
    res.status(200).json({ success: true });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

const getConnections = async (req, res) => {
  try {
    const connections = await Connection.find({
      $or: [{ requester: req.userId }, { recipient: req.userId }],
      status: "accepted",
    })
      .populate("requester", POPULATE_FIELDS)
      .populate("recipient", POPULATE_FIELDS)
      .exec();
    res.status(200).json({ success: true, connections });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

const getPendingRequests = async (req, res) => {
  try {
    const requests = await Connection.find({ recipient: req.userId, status: "pending" })
      .populate("requester", POPULATE_FIELDS)
      .exec();
    res.status(200).json({ success: true, requests });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

const getConnectionStatus = async (req, res) => {
  if (!req?.params?.userId) {
    return res.status(400).json({ success: false, message: "userId param is required" });
  }

  if (!isValidId(req.params.userId, "userId", res)) return;

  try {
    const connection = await Connection.findOne({
      $or: [
        { requester: req.userId, recipient: req.params.userId },
        { requester: req.params.userId, recipient: req.userId },
      ],
    });

    if (!connection) {
      return res.status(200).json({ success: true, status: "none" });
    }

    if (connection.status === "accepted") {
      return res.status(200).json({ success: true, status: "connected", connectionId: connection._id });
    }

    if (connection.status === "pending") {
      const pendingStatus =
        connection.requester.toString() === req.userId ? "pending_sent" : "pending_received";
      return res.status(200).json({ success: true, status: pendingStatus, connectionId: connection._id });
    }

    // declined (or any unexpected status) — treat as no connection per documented contract
    res.status(200).json({ success: true, status: "none" });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

module.exports = {
  sendRequest,
  acceptRequest,
  declineRequest,
  removeConnection,
  getConnections,
  getPendingRequests,
  getConnectionStatus,
};
