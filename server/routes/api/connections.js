const express = require("express");
const router = express.Router();
const connectionController = require("../../controllers/connectionController");
const ROLES_LIST = require("../../config/roles_list");
const verifyRoles = require("../../middleware/verifyRoles");

router.post("/request", verifyRoles(ROLES_LIST.User), connectionController.sendRequest);
router.patch("/:id/accept", verifyRoles(ROLES_LIST.User), connectionController.acceptRequest);
router.patch("/:id/decline", verifyRoles(ROLES_LIST.User), connectionController.declineRequest);
router.delete("/:id", verifyRoles(ROLES_LIST.User), connectionController.removeConnection);
router.get("/", verifyRoles(ROLES_LIST.User), connectionController.getConnections);
router.get("/pending", verifyRoles(ROLES_LIST.User), connectionController.getPendingRequests);
router.get("/status/:userId", verifyRoles(ROLES_LIST.User), connectionController.getConnectionStatus);

module.exports = router;
