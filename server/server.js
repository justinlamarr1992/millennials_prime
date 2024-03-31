require("dotenv").config();
const express = require("express");
const app = express();
const path = require("path");
// const fileUpload = require("express-fileupload");
const cors = require("cors");
const corsOptions = require("./config/corsOptions");
const { logger } = require("./middleware/logEvents");
const errorHandler = require("./middleware/errorHandler");
const verifyJWT = require("./middleware/verifyJWT");
const cookieParser = require("cookie-parser");
var bodyParser = require("body-parser");
const credentials = require("./middleware/credentials");
const mongoose = require("mongoose");
// YOUTUBE TUTUTIAL
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
// TEST

// Testing Restart
// app.use(bodyParser.json({ limit: "200mb" }));
// app.use(
//   bodyParser.urlencoded({
//     limit: "200mb",
//     extended: true,
//     parameterLimit: 1000000,
//   })
// );

// Testing Restart
//middleware
// app.use(express.json({ limit: "30mb", extended: true }));
// app.use((req, res, next) => {
//   console.log(req.path, req.method);
//   next();
// });

// Routes
// Testing Restart
// app.use("/", require("./routes/root"));
app.use("/register", require("./routes/register"));
app.use("/auth", require("./routes/auth"));
app.use("/refresh", require("./routes/refresh"));
app.use("/logout", require("./routes/logout"));

app.use("/test", require("./routes/test"));

// Any route that doesnt need verifications needs to be ABOVE THIS LINE
// Testing Restart
app.use(verifyJWT);

// Testing Restart
// app.use("/comments", require("./routes/api/comments"));
// app.use("/employees", require("./routes/api/employees"));
// app.use("/users", require("./routes/api/users"));
// app.use("/videos", require("./routes/api/video"));
// app.use("/subscribe", require("./routes/api/subscribe"));
// app.use("/likes", require("./routes/api/likes"));

// ALSO TESTING
// app.use("/testUploads", require("./routes/api/testUploads"));

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
  console.log("Connected to MongoDB");
  app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
});

// YOUTUBE TUTUTIAL
exports.api = functions.https.onRequest(app);
