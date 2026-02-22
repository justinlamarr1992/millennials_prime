const User = require("../models/MillPrimeUser");
const logger = require("../utils/logger");

const handleTestWeb = async (req, res) => {
  logger.info("Web API health check");
  try {
    res.status(200).json({
      success: true,
      time: Date.now(),
    });
  } catch (err) {
    logger.error(err);
    res.status(500).json({ success: false, message: err.message });
  }
};
const handleTestApp = async (req, res) => {
  logger.info("App API health check");
  try {
    res.status(200).json({
      success: true,
      time: Date.now(),
    });
  } catch (err) {
    logger.error(err);
    res.status(500).json({ success: false, message: err.message });
  }
};

module.exports = { handleTestWeb, handleTestApp };
