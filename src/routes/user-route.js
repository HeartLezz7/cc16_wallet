const express = require("express");
const router = express.Router();
const userController = require("../controllers/user-controller");

// REGISTER
router.post("/register", userController.register);
// LOGIN
router.post("/login", userController.login);
// FIND BY ID
router.get("/:userId", userController.getById);
// EDIT USER
router.patch("/:userId", userController.editUser);
// DELETE USER
router.delete("/:userId", userController.deleteById);

module.exports = router;
