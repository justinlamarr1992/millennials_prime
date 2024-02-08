// const User = require("../models/userModel");
// const User = require("../models/PrimeUser");
const User = require("../models/MillPrimeUser");

const handleTest = async (req, res) => {
  console.log("Test Complete");
  try {
    console.log("Front End Button connected to Back End");

    res.status(200).json({
      success: true,
      time: Date.now(),
    });
  } catch (err) {
    console.log("Some Error Happened... ");
    console.log("err", err);
    res.status(500).json({ success: false, message: err.message });
  }
};

module.exports = { handleTest };
