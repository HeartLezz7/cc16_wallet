const express = require("express");
const router = express.Router();
const accountController = require("../controllers/account-controller");
const authenticationMw = require("../middlewares/authentication-mw");

router.get("/", accountController.getAll);
router.post("/", accountController.createAccount);
router.patch("/delete/:accountId", accountController.deleteAccount);
router.patch("/edit/:accountId", accountController.editAccount);

module.exports = router;
