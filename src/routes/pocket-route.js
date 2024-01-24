const express = require("express");
const router = express.Router();
const pocketController = require("../controllers/pocket-controller");

router.get("/", pocketController.hello);

module.exports = router;
