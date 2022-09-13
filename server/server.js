require("dotenv").config();

const express = require("express");
// const fileUpload = require("express-fileupload");
const mongoose = require("mongoose");
const cors = require("cors");
var bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");

// Routes
const userRoutes = require("./routes/user");
const postRoutes = require("./routes/post");
const videoRoutes = require("./routes/video");

// express app
const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cookieParser());

//middleware
app.use(express.json({ limit: "30mb", extended: true }));
app.use((req, res, next) => {
  console.log(req.path, req.method);
  next();
});

app.use(
  cors({
    // Specific to orgin
    origin: "http://127.0.0.1:4000",
    // Everything
    // origin: "*",
  })
);

//routes
// app.use('/api/post',postRoutes)
app.use("/api/user", userRoutes);
app.use("/api/post", postRoutes);
app.use("/api/video", videoRoutes);

app.use("/uploads", express.static("uploads"));

if (process.env.NODE_ENV === "production") {
  // Set static folder
  app.use(express.static("client/build"));

  // index.html for all page routes
  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
  });
}

// connect to db
mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    // listen for requests
    app.listen(process.env.PORT, () => {
      console.log("connected to db & listening on port", process.env.PORT);
    });
  })
  .catch((error) => {
    console.log(error);
  });
