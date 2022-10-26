const express = require("express");
const router = express.Router();
const Subscriber = require("../models/Subscriber");

const getSubscribers = async (req, res) => {
  Subscriber.find({ userTo: req.body.userTo }).exec((err, subscribe) => {
    console.log(subscribe);
    if (err) return res.send(400).send(err);

    res.status(200).json({ success: true, subscribeNumber: subscribe });
  });
};

module.exports = {
  getSubscribers,
};
