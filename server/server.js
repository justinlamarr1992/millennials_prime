require("dotenv").config();
const express = require("express");
const app = express();
// const fileUpload = require("express-fileupload");
const cors = require("cors");
const corsOptions = require("./config/corsOptions");
const { logger } = require("./middleware/logEvents");
const verifyJWT = require("./middleware/verifyJWT");
const cookieParser = require("cookie-parser");
const credentials = require("./middleware/credentials");
const mongoose = require("mongoose");
// YOUTUBE TUTORIAL
const functions = require("firebase-functions");

const connectDB = require("./config/dbConn");
const PORT = process.env.CONNECTIONPORT || 4000;

// Connect to the DB
connectDB();

// Custom middlewar logger
app.use(logger);

// HAndle options credential check - BEFORE CORS!!!
// and fetch cookies credentials requirement
app.use(credentials);

// Cross Origin Resource Sharing
app.use(cors(corsOptions));

// middleware for cookies
app.use(cookieParser());

app.use(function (req, res, next) {
  // this is used to make the development work
  // res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");
  // without origins changes this to false
  res.setHeader("Access-Control-Allow-Credentials", true);
  next();
});

// body parsing middleware — express.json handles local dev; Firebase Functions handles cloud
app.use(express.json({ limit: "1mb" }));
app.use(express.urlencoded({ limit: "30mb", extended: true }));

// Routes
// Testing Restart
// app.use("/", require("./routes/root"));
app.use("/register", require("./routes/register"));
app.use("/auth", require("./routes/auth"));
app.use("/refresh", require("./routes/refresh"));
app.use("/logout", require("./routes/logout"));

app.use("/test", require("./routes/test"));

// Any route that doesnt need verifications needs to be ABOVE THIS LINE
app.use(verifyJWT);

app.use("/comments", require("./routes/api/comments"));
app.use("/employees", require("./routes/api/employees"));
app.use("/users", require("./routes/api/users"));
app.use("/videos", require("./routes/api/video"));
app.use("/subscribe", require("./routes/api/subscribe"));
app.use("/likes", require("./routes/api/likes"));
app.use("/connections", require("./routes/api/connections"));

// app.all("*", (req, res) => {
//   res.status(404);
//   if (req.accepts("html")) {
//     res.sendFile(path.join(__dirname, "views", "404.html"));
//   } else if (req.accepts("json")) {
//     res.json({ error: "404 Not Found" });
//   } else {
//     res.type("txt").send("404 Not Found");
//   }
// });

// app.use(errorHandler);

mongoose.connection.once("open", () => {
  console.log(`Connected to MongoDB at ${Date.now()}`);
  app.listen(PORT, () => console.log(`Listening to Port at ${Date.now()}`));
});

// YOUTUBE TUTORIAL
exports.api = functions.https.onRequest(app);
