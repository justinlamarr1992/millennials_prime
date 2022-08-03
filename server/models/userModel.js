const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const validator = require("validator");

const Schema = mongoose.Schema;

const userSchema = new Schema({
  email: { type: String, require: true, unique: true },
  password: { type: String, required: true },
  name: { type: String, required: true },
  // name: {
  //   first: { type: String },
  //   last: { type: String },
  // },
});

// static signup method
userSchema.statics.signup = async function (email, password, name) {
  //validation
  if (!email || !password) {
    throw Error("All fields must be filled");
  }
  // if (!name) {
  //   throw Error("Enter Your Name");
  // }
  if (!validator.isEmail(email)) {
    throw Error("Email is not valid");
  }
  if (!validator.isStrongPassword(password)) {
    throw Error("Password is not Strong Enough");
  }

  const exists = await this.findOne({ email });

  if (exists) {
    throw Error("Email is taken");
  }

  const salt = await bcrypt.genSalt(10);
  const hash = await bcrypt.hash(password, salt);

  const user = await this.create({
    email,
    password: hash,
    name,
  });

  return user;
};

// static login Method
userSchema.statics.login = async function (email, password) {
  if (!email || !password) {
    throw Error("All fields must be filled");
  }

  const user = await this.findOne({ email });

  if (!user) {
    throw Error("Incorrect Email");
  }

  const match = await bcrypt.compare(password, user.password);

  if (!match) {
    throw Error("Incorrect Password");
  }

  return user;
};
// User.signup();

module.exports = mongoose.model("User", userSchema);
