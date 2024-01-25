const express = require("express");
const router = express.Router();
const accountController = require("../controllers/account-controller");
const authenticationMw = require("../middlewares/authentication-mw");

router.get("/", authenticationMw, accountController.getAll);

module.exports = router;
