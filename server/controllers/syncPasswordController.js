const admin = require("../config/firebaseAdmin");
const User = require("../models/MillPrimeUser");
const bcrypt = require("bcrypt");

const handleSyncPassword = async (req, res) => {
  const authHeader = req.headers.authorization || req.headers.Authorization;
  if (!authHeader?.startsWith("Bearer ")) return res.sendStatus(401);

  const { newPassword } = req.body;
  if (typeof newPassword !== "string") {
    return res
      .status(400)
      .json({ message: "newPassword must be a non-empty string" });
  }
  const trimmedPassword = newPassword.trim();
  if (trimmedPassword.length === 0) {
    return res
      .status(400)
      .json({ message: "newPassword must be a non-empty string" });
  }
  if (trimmedPassword.length < 6) {
    return res
      .status(400)
      .json({ message: "newPassword must be at least 6 characters long" });
  }

  const idToken = authHeader.split(" ")[1];

  // Verify the Firebase ID token — confirms identity without requiring the old password
  let decodedToken;
  try {
    decodedToken = await admin.auth().verifyIdToken(idToken);
  } catch {
    return res.sendStatus(401);
  }

  const email = decodedToken.email;
  if (!email) return res.sendStatus(401);

  // Look up by username (which stores the email — matches register and login conventions).
  // Note: the user schema has no uid field; email is the stable identity key in MongoDB.
  let foundUser;
  try {
    foundUser = await User.findOne({ username: email }).exec();
  } catch (dbError) {
    console.error("syncPassword: DB lookup error:", dbError);
    return res.sendStatus(500);
  }
  if (!foundUser) return res.sendStatus(404);

  try {
    const hashedPassword = await bcrypt.hash(trimmedPassword, 10);
    foundUser.password = hashedPassword;
    await foundUser.save();
  } catch (saveError) {
    console.error("syncPassword: DB write error:", saveError);
    return res.sendStatus(500);
  }

  res.sendStatus(200);
};

module.exports = { handleSyncPassword };
