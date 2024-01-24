const express = require("express");
const router = express.Router();
const userController = require("../controllers/user-controller");
const authenticationMw = require("../middlewares/authentication-mw");

// REGISTER
router.post("/register", userController.register);
// LOGIN
router.post("/login", userController.login);
// FIND BY ID
router.get("/:userId", userController.getById);
// EDIT USER
router.patch("/:userId", authenticationMw, userController.editUser);
// DELETE USER
router.delete("/:userId", authenticationMw, userController.deleteById);

module.exports = router;
