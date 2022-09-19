const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const saltRounds = 10;
const jwt = require("jsonwebtoken");

const validator = require("validator");

const Schema = mongoose.Schema;

const userSchema = new Schema(
  {
    username: {
      type: String,
      required: true,
    },
    name: { type: String, required: true },
    lastname: { type: String, maxlength: 50 },
    email: { type: String, require: true, unique: 1 },
    password: { type: String, required: true, minlength: 6 },
    // role: { type: Number, default: 0 },
    roles: {
      User: {
        type: Number,
        default: 2001,
      },
      Editor: Number,
      Admin: Number,
    },
    image: String,
    token: { type: String },
    tokenExp: { type: Number },
    refreshToken: [String],
  },
  { timestamps: true }
);

userSchema.pre("save", function (next) {
  var user = this;

  if (user.isModified("password")) {
    bcrypt.genSalt(saltRounds, function (err, salt) {
      if (err) return next(err);

      bcrypt.hash(user.password, salt, function (err, hash) {
        if (err) return next(err);
        user.password = hash;
        next();
      });
    });
  } else {
    next();
  }
});

userSchema.methods.comparePassword = function (plainPassword, cb) {
  bcrypt.compare(plainPassword, this.password, function (err, isMatch) {
    if (err) return cb(err);
    cb(null, isMatch);
  });
};

userSchema.methods.generateToken = function (cb) {
  var user = this;
  var token = jwt.sign(user._id.toHexString(), "secret");

  user.token = token;
  user.save(function (err, user) {
    if (err) return cb(err);
    cb(null, user);
  });
};

userSchema.static.findByToken = function (token, cb) {
  var user = this;

  jwt.verify(token, "secret", function (err, decode) {
    user.findOne(
      {
        _id: decode,
        token: token,
      },
      function (err, user) {
        if (err) return cb(err);
        cb(null, user);
      }
    );
  });
};

const User = mongoose.model("User", userSchema);
module.exports = { User };

// // static signup method
// userSchema.statics.signup = async function (email, password, name) {
//   //validation
//   if (!email || !password) {
//     throw Error("All fields must be filled");
//   }
//   // if (!name) {
//   //   throw Error("Enter Your Name");
//   // }
//   if (!validator.isEmail(email)) {
//     throw Error("Email is not valid");
//   }
//   if (!validator.isStrongPassword(password)) {
//     throw Error("Password is not Strong Enough");
//   }

//   const exists = await this.findOne({ email });

//   if (exists) {
//     throw Error("Email is taken");
//   }

//   const salt = await bcrypt.genSalt(10);
//   const hash = await bcrypt.hash(password, salt);

//   const user = await this.create({
//     email,
//     password: hash,
//     name,
//   });

//   return user;
// };

// // static login Method
// userSchema.statics.login = async function (email, password) {
//   if (!email || !password) {
//     throw Error("All fields must be filled");
//   }

//   const user = await this.findOne({ email });

//   if (!user) {
//     throw Error("Incorrect Email");
//   }

//   const match = await bcrypt.compare(password, user.password);

//   if (!match) {
//     throw Error("Incorrect Password");
//   }

//   return user;
// };
// // User.signup();

// module.exports = mongoose.model("User", userSchema);
