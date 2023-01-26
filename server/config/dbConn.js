const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    // TODO: may need ot inserrt GFS here
    await mongoose.connect(process.env.MONGO_URI, {
      useUnifiedTopology: true,
      useNewUrlParser: true,
    });
  } catch (err) {
    console.error(err);
  }
};

module.exports = connectDB;
