const allowedOrigins = require("./allowedOrigins");

const corsOptions = {
  origin: (origin, callback) => {
    // !orgin is for development
    if (allowedOrigins.indexOf(origin) !== -1 || !origin) {
      callback(null, true);
    } else {
      callback(
        new Error("Not allowed by CORS for the server/config/corsOptions")
      );
    }
  },
  optionsSuccessStatus: 200,
};

module.exports = corsOptions;
