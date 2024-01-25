const express = require("express");
const router = express.Router();
const transactionController = require("../controllers/transaction-controller");

router.get("/", transactionController.getAllTransactions);
router.post("/", transactionController.createTransaction);
router.patch("/:tranId", transactionController.updateTransaction);
router.delete("/:tranId", transactionController.deleteTransaction);

module.exports = router;
