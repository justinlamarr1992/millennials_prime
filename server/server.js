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
const connectDB = require("./config/dbConn");
const PORT = process.env.PORT || 4000;

// Connect to the DB
connectDB();

// Custom middlewar logger
app.use(logger);

// HAndle options credential check - BEFORE CORS!!!
// and fetch cookies credentials requirement
app.use(credentials);

// Cross Origin Resource Sharing
app.use(cors(corsOptions));

// builtin middleware fro json
// app.use(express.json());

// Bulit-in middleware to handle urlencoded formdata
// app.use(express.urlencoded({ extended: false }));
// app.use(express.urlencoded({ limit: "50mb", extended: false }));

// middleware for cookies
app.use(cookieParser());

// serve static files MEANING THE FILES SAVED FOR TESTING
// FIND WAY FOR PRODUCTION
app.use("/uploads", express.static(path.join(__dirname, "..", "/uploads")));
// app.use("/uploads", express.static("uploads"));

// app.use(bodyParser.urlencoded({ extended: true }));
// app.use(bodyParser.json());
app.use(bodyParser.json({ limit: "200mb" }));
app.use(
  bodyParser.urlencoded({
    limit: "200mb",
    extended: true,
    parameterLimit: 1000000,
  })
);

//middleware
app.use(express.json({ limit: "30mb", extended: true }));
app.use((req, res, next) => {
  console.log(req.path, req.method);
  next();
});

// Routes
app.use("/", require("./routes/root"));
app.use("/register", require("./routes/register"));
app.use("/auth", require("./routes/auth"));
app.use("/refresh", require("./routes/refresh"));
app.use("/logout", require("./routes/logout"));

// Any route that doesnt need verifications needs to be ABOVE THIS LINE
app.use(verifyJWT);

app.use("/comments", require("./routes/api/comments"));
app.use("/employees", require("./routes/api/employees"));
app.use("/users", require("./routes/api/users"));
app.use("/videos", require("./routes/api/video"));
app.use("/subscribe", require("./routes/api/subscribe"));
app.use("/likes", require("./routes/api/likes"));

app.all("*", (req, res) => {
  res.status(404);
  if (req.accepts("html")) {
    res.sendFile(path.join(__dirname, "views", "404.html"));
  } else if (req.accepts("json")) {
    res.json({ error: "404 Not Found" });
  } else {
    res.type("txt").send("404 Not Found");
  }
});

app.use(errorHandler);

mongoose.connection.once("open", () => {
  console.log("Connected to MongoDB");
  app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
});
