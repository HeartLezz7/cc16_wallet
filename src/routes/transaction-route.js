const express = require("express");
const router = express.Router();
const transactionController = require("../controllers/transaction-controller");
const authenticationMw = require("../middlewares/authentication-mw");

router.get(
  "/:accId",
  authenticationMw,
  transactionController.getAllTransactionsById
);
router.post("/", authenticationMw, transactionController.createTransaction);
router.patch(
  "/:tranId",
  authenticationMw,
  transactionController.updateTransaction
);
router.delete(
  "/:tranId",
  authenticationMw,
  transactionController.deleteTransaction
);

module.exports = router;
