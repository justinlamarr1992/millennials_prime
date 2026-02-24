const admin = require("firebase-admin");

// Guard against double-initialization — Firebase Functions may pre-init the default app.
// In the cloud, initializeApp() with no args uses Application Default Credentials (ADC)
// automatically. For local dev, set GOOGLE_APPLICATION_CREDENTIALS to a service account JSON.
if (!admin.apps.length) {
  admin.initializeApp();
}

module.exports = admin;
