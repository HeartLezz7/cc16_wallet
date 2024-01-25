const express = require("express");
const router = express.Router();
const transactionController = require("../controllers/transaction-controller");

router.get("/:accId", transactionController.getAllTransactionsById);
router.post("/", transactionController.createTransaction);
router.patch("/:tranId", transactionController.updateTransaction);
router.delete("/:tranId", transactionController.deleteTransaction);

module.exports = router;
