const express = require("express");
const router = express.Router();
const transactionController = require("../controllers/transaction-route");

router.get("/", transactionController.hello);

module.exports = router;
