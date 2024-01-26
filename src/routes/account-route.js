const express = require("express");
const router = express.Router();
const accountController = require("../controllers/account-controller");
const authenticationMw = require("../middlewares/authentication-mw");

router.get("/", authenticationMw, accountController.getAll);
router.post("/", authenticationMw, accountController.createAccount);
router.patch(
  "/delete/:accountId",
  authenticationMw,
  accountController.deleteAccount
);
router.patch(
  "/edit/:accountId",
  authenticationMw,
  accountController.editAccount
);

module.exports = router;
