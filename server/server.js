require("dotenv").config();
const express = require("express");
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

const app = express();

// middleware for cookies
app.use(cookieParser());

// Connect to the DB
connectDB();

// Custom middlewar logger
app.use(logger);

// HAndle options credential check - BEFORE CORS!!!
// and fetch cookies credentials requirement
app.use(credentials);

// Cross Origin Resource Sharing
app.use(cors(corsOptions));
// app.use(
//   cors({
//     // Specific to orgin
//     // origin: "http://127.0.0.1:4000",
//     origin: "http://localhost:3000",
//     credentials: true,
//     // Everything
//     // origin: "*",
//   })
// );

// Bulit-in middleware to handle urlencoded formdata
app.use(express.urlencoded({ extended: false }));

// app.use(function (req, res, next) {
// res.setHeader("Access-clearControl-Allow-Origin", "*");
//   res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
//   res.setHeader("Access-Control-Allow-Headers", "Content-Type");
//   res.setHeader("Access-Control-Allow-Credentials", true);
//   next();
// });

// builtin middleware fro json
app.use(express.json());

// erve static files
// app.use("/", express.static(path.join(__dirname, "/public")));
// app.use("/uploads", express.static("uploads"));

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

//middleware
app.use(express.json({ limit: "30mb", extended: true }));
app.use((req, res, next) => {
  console.log(req.path, req.method);
  next();
});

// app.use(verifyJWT);

// Routes
app.use("/employees", require("./routes/api/employees"));
const authRoutes = require("./routes/auth");
const userRoutes = require("./routes/user");
const postRoutes = require("./routes/post");
const videoRoutes = require("./routes/video");
app.use("/api/auth", authRoutes);
app.use("/api/user", userRoutes);
app.use("/api/post", postRoutes);
app.use("/api/video", videoRoutes);

app.use(errorHandler);

// if (process.env.NODE_ENV === "production") {
//   // Set static folder
//   app.use(express.static("client/build"));

//   // index.html for all page routes
//   app.get("*", (req, res) => {
//     res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
//   });
// }

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
