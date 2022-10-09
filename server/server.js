require("dotenv").config();
const express = require("express");
const app = express();
const path = require("path");
// const fileUpload = require("express-fileupload");
const mongoose = require("mongoose");
const cors = require("cors");
const corsOptions = require("./config/corsOptions");
const { logger } = require("./middleware/logEvents");
const errorHandler = require("./middleware/errorHandler");
const verifyJWT = require("./middleware/verifyJWT");
const cookieParser = require("cookie-parser");
var bodyParser = require("body-parser");
const credentials = require("./middleware/credentials");
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

// Bulit-in middleware to handle urlencoded formdata
app.use(express.urlencoded({ extended: false }));

// builtin middleware fro json
app.use(express.json());

// middleware for cookies
app.use(cookieParser());

// serve static files
app.use("/", express.static(path.join(__dirname, "/public")));
// app.use("/uploads", express.static("uploads"));

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

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

// Any route that doesnt need verifications needs to be ABOVE THIS LINE
app.use(verifyJWT);

app.use("/employees", require("./routes/api/employees"));

// const authRoutes = require("./routes/auth");
// const userRoutes = require("./routes/user");
// const postRoutes = require("./routes/post");
// const videoRoutes = require("./routes/video");
// app.use("/api/auth", authRoutes);
// app.use("/api/user", userRoutes);
// app.use("/api/post", postRoutes);
// app.use("/api/video", videoRoutes);

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

// old way
// mongoose
//   .connect(process.env.MONGO_URI, {
//     useNewUrlParser: true,
//     useUnifiedTopology: true,
//   })
//   .then(() => {
//     // listen for requests
//     app.listen(process.env.PORT, () => {
//       console.log("connected to db & listening on port", process.env.PORT);
//     });
//   })
//   .catch((error) => {
//     console.log(error);
//   });
