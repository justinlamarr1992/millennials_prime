const express = require("express");
const router = express.Router();
const Subscriber = require("../models/Subscriber");
const Video = require("../models/VideoModel");
// const { subscribe } = require("../routes/root");

// TODO: Test the format so the users hsvr subscibers withn their account or profile instead of subscribers by its self

const getSubscribes = async (req, res) => {
  const userTo = req.body.userTo;
  const userFrom = req.body.userFrom;

  console.log("req.body : ", req.body);
  console.log("userTo from getSubscribes: ", userTo);
  console.log("userFrom from getSubscribes: ", userFrom);

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
  const userTo = req.body.userTo;
  const userFrom = req.body.userFrom;

  const subscribed = await Subscriber.find({ userTo, userFrom }).exec();

  try {
    let result = false;
    if (subscribed.length !== 0) {
      result = true;
    }
    res.json({ subscribed: result });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const postSubscribe = async (req, res) => {
  try {
    const subscribe = await Subscriber.create(req.body);
    console.log(subscribe);
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
  const userTo = req.body.userTo;
  const userFrom = req.body.userFrom;

  try {
    const subscribe = await Subscriber.findOneAndDelete({
      userTo,
      userFrom,
    }).exec();
    res.status(201).json({ success: true });
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