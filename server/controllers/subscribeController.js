const express = require("express");
const router = express.Router();
var mongoose = require("mongoose");
const Subscriber = require("../models/Subscriber");
const Video = require("../models/VideoModel");
// const { subscribe } = require("../routes/root");

// TODO: Test the format so the users hsvr subscibers withn their account or profile instead of subscribers by its self

const getSubscribes = async (req, res) => {
  const userTo = req.body.userTo;
  const userFrom = req.body.userFrom;

  // console.log("req.body : ", req.body);
  // console.log("userTo from getSubscribes: ", userTo);
  // console.log("userFrom from getSubscribes: ", userFrom);

  const subscribers = await Subscriber.find({ userTo }).exec();
  if (!subscribers)
    return res
      .sendStatus(204)
      .json({ message: `No Subscribers for ID ${userTo}` });
  try {
    res.json({ subscriberNumber: subscribers.length });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const getSubscribed = async (req, res) => {
  // console.log(req.body);
  // console.log(
  //   "TO: ",
  //   req.body.userTo,
  //   ", From: ",
  //   req.body.userFrom
  //   // " Userid: ",
  //   // req.body.userid
  // );
  const userTo = new mongoose.Types.ObjectId(req.body.userTo);
  const userFrom = new mongoose.Types.ObjectId(req.body.userFrom);
  // const userid = req.body.userid;
  let connected = Boolean;

  if (
    !userTo ||
    !userFrom
    // || userid
  ) {
    return res
      .status(400)
      .json({ message: "Need all of the neccessary information" });
  } else {
    try {
      // const subscribed = await Subscriber.find({ userTo, userFrom }).exec();
      const subscribed = await Subscriber.find({
        $and: [{ userTo, userFrom }],
      }).exec();
      if (!subscribed || subscribed.length < 1) {
        connected = false;
        res.status(200).json({ connected, message: "Users arent connected" });
      } else {
        // console.log("This is the Subscribed query", subscribed);
        connected = true;
        res.status(200).json({ connected, message: "Users are connected" });
      }
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  }
};

const postSubscribe = async (req, res) => {
  const userTo = req.body.userTo;
  const userFrom = req.body.userFrom;
  try {
    const subscribe = await Subscriber.create({
      userTo,
      userFrom,
    });
    // console.log(subscribe);
    res.status(201).json({ success: `New Subscriber` });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }

  // const subscribe = new Subscriber(req.body);

  // subscribe.save((err, doc) => {
  //   if (err) return res.json({ success: false, err });
  //   return res.status(200).json({ success: true });
  // });
};

const postUnsubscribe = async (req, res) => {
  // console.log(req.body);
  const userTo = new mongoose.Types.ObjectId(req.body.userTo);
  const userFrom = new mongoose.Types.ObjectId(req.body.userFrom);

  try {
    const unsubscribe = await Subscriber.findOneAndDelete({
      userTo,
      userFrom,
    }).exec();
    res.status(201).json({ success: true, unsubscribe });
    // res.status(201).json({ success: true, doc }); but this doesnt work and with out its does it
    // John Ahn awanted doc
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

module.exports = {
  getSubscribes,
  getSubscribed,
  postSubscribe,
  postUnsubscribe,
};
