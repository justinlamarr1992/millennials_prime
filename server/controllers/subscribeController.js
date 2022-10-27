const express = require("express");
const router = express.Router();
const Subscriber = require("../models/Subscriber");

const getSubscribers = async (req, res) => {
  // console.log(subscribeNumberVariable);
  console.log(req.body);
  const userTo = req.body.userTo;
  const userFrom = req.body.userFrom;
  console.log(userTo);
  console.log(userFrom);

  // Subscriber.find({ userTo: req.body.userTo }).exec((err, subscribe) => {
  //   if (err) return res.sendStatus(400).sendStatus(err);

  //   res.sendStatus(200).json({ success: true, subscribeNumber: subscribe });
  // });

  const subscribers = await Subscriber.find({ userTo }).exec();
  if (!subscribers)
    return res
      .sendStatus(204)
      .json({ message: `No Subscribers for ID ${userTo}` });

  res.json({
    // success: true,
    // message: `Number of subscriber ${subscribers.length}`,
    subscriberNumber: subscribers.length,
  });
};

module.exports = {
  getSubscribers,
};
