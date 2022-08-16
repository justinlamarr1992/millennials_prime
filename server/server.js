require("dotenv").config();

const express = require("express");
const fileUpload = require("express-fileupload");
const mongoose = require("mongoose");
const cors = require("cors");

const userRoutes = require("./routes/user");
const postRoutes = require("./routes/post");

// express app
const app = express();

app.use(fileUpload());

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

// connect to db
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    // listen for requests
    app.listen(process.env.PORT, () => {
      console.log("connected to db & listening on port", process.env.PORT);
    });
  })
  .catch((error) => {
    console.log(error);
  });
