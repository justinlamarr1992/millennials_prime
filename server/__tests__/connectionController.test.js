const User = require("../models/MillPrimeUser");
const Connection = require("../models/Connection");
const {
  sendRequest,
  acceptRequest,
  declineRequest,
  removeConnection,
  getConnections,
  getPendingRequests,
  getConnectionStatus,
} = require("../controllers/connectionController");

jest.mock("../models/MillPrimeUser");
jest.mock("../models/Connection");

const REQUESTER_ID = "507f1f77bcf86cd799439011";
const RECIPIENT_ID = "507f1f77bcf86cd799439012";
const CONNECTION_ID = "507f1f77bcf86cd799439013";

const mockConnection = {
  _id: CONNECTION_ID,
  requester: REQUESTER_ID,
  recipient: RECIPIENT_ID,
  status: "pending",
};

describe("connectionController", () => {
  let req, res;

  beforeEach(() => {
    res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };
    jest.clearAllMocks();
  });

  // ─── sendRequest ────────────────────────────────────────────────────────────

  describe("sendRequest", () => {
    beforeEach(() => {
      req = { userId: REQUESTER_ID, body: { recipientId: RECIPIENT_ID } };
    });

    it("returns 400 when recipientId is missing", async () => {
      req.body = {};
      await sendRequest(req, res);
      expect(res.status).toHaveBeenCalledWith(400);
      expect(res.json).toHaveBeenCalledWith({ success: false, message: "recipientId is required" });
    });

    it("returns 400 when requester sends request to themselves", async () => {
      req.body = { recipientId: REQUESTER_ID };
      await sendRequest(req, res);
      expect(res.status).toHaveBeenCalledWith(400);
      expect(res.json).toHaveBeenCalledWith({ success: false, message: "Cannot connect with yourself" });
    });

    it("returns 404 when recipient does not exist", async () => {
      User.findById.mockResolvedValue(null);
      await sendRequest(req, res);
      expect(res.status).toHaveBeenCalledWith(404);
      expect(res.json).toHaveBeenCalledWith({ success: false, message: "Recipient not found" });
    });

    it("returns 409 when connection already exists", async () => {
      User.findById.mockResolvedValue({ _id: RECIPIENT_ID });
      Connection.findOne.mockResolvedValue(mockConnection);
      await sendRequest(req, res);
      expect(res.status).toHaveBeenCalledWith(409);
      expect(res.json).toHaveBeenCalledWith({ success: false, message: "Connection already exists" });
    });

    it("returns 201 when previous connection was declined — allows re-request", async () => {
      User.findById.mockResolvedValue({ _id: RECIPIENT_ID });
      Connection.findOne.mockResolvedValue(null);
      Connection.create.mockResolvedValue({ ...mockConnection, status: "pending" });
      await sendRequest(req, res);
      expect(res.status).toHaveBeenCalledWith(201);
    });

    it("returns 201 with created connection on success", async () => {
      User.findById.mockResolvedValue({ _id: RECIPIENT_ID });
      Connection.findOne.mockResolvedValue(null);
      Connection.create.mockResolvedValue(mockConnection);
      await sendRequest(req, res);
      expect(res.status).toHaveBeenCalledWith(201);
      expect(res.json).toHaveBeenCalledWith({ success: true, connection: mockConnection });
    });

    it("creates connection with requester from req.userId", async () => {
      User.findById.mockResolvedValue({ _id: RECIPIENT_ID });
      Connection.findOne.mockResolvedValue(null);
      Connection.create.mockResolvedValue(mockConnection);
      await sendRequest(req, res);
      expect(Connection.create).toHaveBeenCalledWith({
        requester: REQUESTER_ID,
        recipient: RECIPIENT_ID,
        status: "pending",
      });
    });

    it("returns 500 on unexpected error", async () => {
      User.findById.mockRejectedValue(new Error("DB error"));
      await sendRequest(req, res);
      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.json).toHaveBeenCalledWith({ success: false, message: expect.any(String) });
    });
  });

  // ─── acceptRequest ───────────────────────────────────────────────────────────

  describe("acceptRequest", () => {
    beforeEach(() => {
      req = { userId: RECIPIENT_ID, params: { id: CONNECTION_ID } };
    });

    it("returns 404 when connection is not found", async () => {
      Connection.findById.mockResolvedValue(null);
      await acceptRequest(req, res);
      expect(res.status).toHaveBeenCalledWith(404);
      expect(res.json).toHaveBeenCalledWith({ success: false, message: "Connection not found" });
    });

    it("returns 403 when user is not the recipient", async () => {
      Connection.findById.mockResolvedValue({ ...mockConnection, recipient: "other-id" });
      await acceptRequest(req, res);
      expect(res.status).toHaveBeenCalledWith(403);
      expect(res.json).toHaveBeenCalledWith({ success: false, message: "Not authorized" });
    });

    it("returns 400 when connection is not pending", async () => {
      Connection.findById.mockResolvedValue({ ...mockConnection, recipient: RECIPIENT_ID, status: "accepted" });
      await acceptRequest(req, res);
      expect(res.status).toHaveBeenCalledWith(400);
      expect(res.json).toHaveBeenCalledWith({ success: false, message: "Connection is not pending" });
    });

    it("returns 200 on success", async () => {
      Connection.findById.mockResolvedValue({ ...mockConnection, recipient: RECIPIENT_ID, status: "pending" });
      Connection.findByIdAndUpdate.mockResolvedValue({ ...mockConnection, status: "accepted" });
      await acceptRequest(req, res);
      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith({ success: true });
    });

    it("returns 500 on unexpected error", async () => {
      Connection.findById.mockRejectedValue(new Error("DB error"));
      await acceptRequest(req, res);
      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.json).toHaveBeenCalledWith({ success: false, message: expect.any(String) });
    });
  });

  // ─── declineRequest ──────────────────────────────────────────────────────────

  describe("declineRequest", () => {
    beforeEach(() => {
      req = { userId: RECIPIENT_ID, params: { id: CONNECTION_ID } };
    });

    it("returns 404 when connection is not found", async () => {
      Connection.findById.mockResolvedValue(null);
      await declineRequest(req, res);
      expect(res.status).toHaveBeenCalledWith(404);
    });

    it("returns 403 when user is not the recipient", async () => {
      Connection.findById.mockResolvedValue({ ...mockConnection, recipient: "other-id" });
      await declineRequest(req, res);
      expect(res.status).toHaveBeenCalledWith(403);
    });

    it("returns 400 when connection is not pending", async () => {
      Connection.findById.mockResolvedValue({ ...mockConnection, recipient: RECIPIENT_ID, status: "accepted" });
      await declineRequest(req, res);
      expect(res.status).toHaveBeenCalledWith(400);
    });

    it("returns 200 on success", async () => {
      Connection.findById.mockResolvedValue({ ...mockConnection, recipient: RECIPIENT_ID, status: "pending" });
      Connection.findByIdAndUpdate.mockResolvedValue({ ...mockConnection, status: "declined" });
      await declineRequest(req, res);
      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith({ success: true });
    });

    it("returns 500 on unexpected error", async () => {
      Connection.findById.mockRejectedValue(new Error("DB error"));
      await declineRequest(req, res);
      expect(res.status).toHaveBeenCalledWith(500);
    });
  });

  // ─── removeConnection ────────────────────────────────────────────────────────

  describe("removeConnection", () => {
    const accepted = { ...mockConnection, status: "accepted", deleteOne: jest.fn().mockResolvedValue({}) };

    beforeEach(() => {
      req = { userId: REQUESTER_ID, params: { id: CONNECTION_ID } };
    });

    it("returns 404 when connection is not found", async () => {
      Connection.findById.mockResolvedValue(null);
      await removeConnection(req, res);
      expect(res.status).toHaveBeenCalledWith(404);
    });

    it("returns 403 when user is not a party to the connection", async () => {
      Connection.findById.mockResolvedValue({ ...accepted, requester: "other1", recipient: "other2" });
      await removeConnection(req, res);
      expect(res.status).toHaveBeenCalledWith(403);
    });

    it("returns 400 when connection is not accepted", async () => {
      Connection.findById.mockResolvedValue({ ...mockConnection, requester: REQUESTER_ID, recipient: RECIPIENT_ID, status: "pending" });
      await removeConnection(req, res);
      expect(res.status).toHaveBeenCalledWith(400);
      expect(res.json).toHaveBeenCalledWith({ success: false, message: "Can only remove accepted connections" });
    });

    it("returns 200 and deletes when requester removes", async () => {
      const conn = { ...accepted, requester: REQUESTER_ID, recipient: RECIPIENT_ID, deleteOne: jest.fn().mockResolvedValue({}) };
      Connection.findById.mockResolvedValue(conn);
      await removeConnection(req, res);
      expect(conn.deleteOne).toHaveBeenCalled();
      expect(res.status).toHaveBeenCalledWith(200);
    });

    it("returns 200 and deletes when recipient removes", async () => {
      req.userId = RECIPIENT_ID;
      const conn = { ...accepted, requester: REQUESTER_ID, recipient: RECIPIENT_ID, deleteOne: jest.fn().mockResolvedValue({}) };
      Connection.findById.mockResolvedValue(conn);
      await removeConnection(req, res);
      expect(conn.deleteOne).toHaveBeenCalled();
      expect(res.status).toHaveBeenCalledWith(200);
    });

    it("returns 500 on unexpected error", async () => {
      Connection.findById.mockRejectedValue(new Error("DB error"));
      await removeConnection(req, res);
      expect(res.status).toHaveBeenCalledWith(500);
    });
  });

  // ─── getConnections ──────────────────────────────────────────────────────────

  describe("getConnections", () => {
    const populateChain = (result) => ({
      populate: jest.fn().mockReturnValue({
        populate: jest.fn().mockReturnValue({
          exec: jest.fn().mockResolvedValue(result),
        }),
      }),
    });

    beforeEach(() => {
      req = { userId: REQUESTER_ID };
    });

    it("returns 200 with accepted connections for the authenticated user", async () => {
      Connection.find.mockReturnValue(populateChain([mockConnection]));
      await getConnections(req, res);
      expect(Connection.find).toHaveBeenCalledWith(
        expect.objectContaining({ status: "accepted" })
      );
      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith({ success: true, connections: [mockConnection] });
    });

    it("returns 500 on unexpected error", async () => {
      Connection.find.mockReturnValue({
        populate: jest.fn().mockReturnValue({
          populate: jest.fn().mockReturnValue({
            exec: jest.fn().mockRejectedValue(new Error("DB error")),
          }),
        }),
      });
      await getConnections(req, res);
      expect(res.status).toHaveBeenCalledWith(500);
    });
  });

  // ─── getPendingRequests ──────────────────────────────────────────────────────

  describe("getPendingRequests", () => {
    beforeEach(() => {
      req = { userId: RECIPIENT_ID };
    });

    it("returns 200 with pending requests where user is recipient", async () => {
      Connection.find.mockReturnValue({
        populate: jest.fn().mockReturnValue({
          exec: jest.fn().mockResolvedValue([mockConnection]),
        }),
      });
      await getPendingRequests(req, res);
      expect(Connection.find).toHaveBeenCalledWith({ recipient: RECIPIENT_ID, status: "pending" });
      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith({ success: true, requests: [mockConnection] });
    });

    it("returns 500 on unexpected error", async () => {
      Connection.find.mockReturnValue({
        populate: jest.fn().mockReturnValue({
          exec: jest.fn().mockRejectedValue(new Error("DB error")),
        }),
      });
      await getPendingRequests(req, res);
      expect(res.status).toHaveBeenCalledWith(500);
    });
  });

  // ─── getConnectionStatus ─────────────────────────────────────────────────────

  describe("getConnectionStatus", () => {
    beforeEach(() => {
      req = { userId: REQUESTER_ID, params: { userId: RECIPIENT_ID } };
    });

    it("returns 400 when userId param is missing", async () => {
      req.params = {};
      await getConnectionStatus(req, res);
      expect(res.status).toHaveBeenCalledWith(400);
    });

    it("returns none when no connection exists", async () => {
      Connection.findOne.mockResolvedValue(null);
      await getConnectionStatus(req, res);
      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith({ success: true, status: "none" });
    });

    it("returns pending_sent when auth user is requester and status is pending", async () => {
      Connection.findOne.mockResolvedValue({ ...mockConnection, requester: REQUESTER_ID, recipient: RECIPIENT_ID, status: "pending" });
      await getConnectionStatus(req, res);
      expect(res.json).toHaveBeenCalledWith({ success: true, status: "pending_sent", connectionId: CONNECTION_ID });
    });

    it("returns pending_received when auth user is recipient and status is pending", async () => {
      req.userId = RECIPIENT_ID;
      req.params.userId = REQUESTER_ID;
      Connection.findOne.mockResolvedValue({ ...mockConnection, requester: REQUESTER_ID, recipient: RECIPIENT_ID, status: "pending" });
      await getConnectionStatus(req, res);
      expect(res.json).toHaveBeenCalledWith({ success: true, status: "pending_received", connectionId: CONNECTION_ID });
    });

    it("returns connected when status is accepted", async () => {
      Connection.findOne.mockResolvedValue({ ...mockConnection, status: "accepted" });
      await getConnectionStatus(req, res);
      expect(res.json).toHaveBeenCalledWith({ success: true, status: "connected", connectionId: CONNECTION_ID });
    });

    it("returns declined when status is declined", async () => {
      Connection.findOne.mockResolvedValue({ ...mockConnection, status: "declined" });
      await getConnectionStatus(req, res);
      expect(res.json).toHaveBeenCalledWith({ success: true, status: "declined", connectionId: CONNECTION_ID });
    });

    it("returns 500 on unexpected error", async () => {
      Connection.findOne.mockRejectedValue(new Error("DB error"));
      await getConnectionStatus(req, res);
      expect(res.status).toHaveBeenCalledWith(500);
    });
  });
});
