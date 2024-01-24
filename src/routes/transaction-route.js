const express = require("express");
const router = express.Router();
const transactionController = require("../controllers/transaction-controller");

router.get("/", transactionController.hello);

module.exports = router;
