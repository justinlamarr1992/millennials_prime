const admin = require("../config/firebaseAdmin");
const User = require("../models/MillPrimeUser");
const bcrypt = require("bcrypt");

const handleSyncPassword = async (req, res) => {
  const authHeader = req.headers.authorization || req.headers.Authorization;
  if (!authHeader?.startsWith("Bearer ")) return res.sendStatus(401);

  const { newPassword } = req.body;
  if (!newPassword) return res.status(400).json({ message: "newPassword is required" });

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

  // Look up by username (which stores the email — matches register and login conventions)
  const foundUser = await User.findOne({ username: email }).exec();
  if (!foundUser) return res.sendStatus(404);

  const hashedPassword = await bcrypt.hash(newPassword, 10);
  foundUser.password = hashedPassword;
  await foundUser.save();

  res.sendStatus(200);
};

module.exports = { handleSyncPassword };
