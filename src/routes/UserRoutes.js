const express = require("express");
const router = express.Router();
const {
  inviteUser,
  setupAccount,
  // getUsers,
  // getUserById,
  // updateUser,
  // deleteUser,
} = require("../controllers/UserController");
const IsAuthenticated = require("../middlewares/AuthMiddleware");
const HasPermission = require("../middlewares/PermissionMiddleware");

router.post(
  "/invite-user",
  inviteUser,
  IsAuthenticated,
  HasPermission("create-user")
);

router.post("/setup-account", setupAccount);
// router.get("/get-all", getUsers);
// router.get("/get/:id", getUserById);
// router.put("/update/:id", updateUser);
// router.delete("/delete/:id", deleteUser);

module.exports = router;
