// const User = require("../models/userModel");
// const User = require("../models/PrimeUser");
const User = require("../models/MillPrimeUser");

const handleTestWeb = async (req, res) => {
  console.log("Test Complete");
  try {
    console.log(
      "Website Front End Button connected to Back End at ",
      Date.now()
    );

    res.status(200).json({
      success: true,
      time: Date.now(),
    });
  } catch (err) {
    console.log("Some Error Happened... at ", Date.now());
    console.log("err", err);
    res.status(500).json({ success: false, message: err.message });
  }
};
const handleTestApp = async (req, res) => {
  console.log("Test Complete for the APP");
  try {
    console.log(
      "Mobile App Front End Button connected to Back End at ",
      Date.now()
    );

    res.status(200).json({
      success: true,
      time: Date.now(),
    });
  } catch (err) {
    console.log("Some Error Happened... at ", Date.now());
    console.log("err", err);
    res.status(500).json({ success: false, message: err.message });
  }
};

module.exports = { handleTestWeb, handleTestApp };
