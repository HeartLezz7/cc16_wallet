const express = require("express");
const morgan = require("morgan");
const app = express();
const cors = require("cors");
require("dotenv").config();

const userRoute = require("./routes/user-route");
const pocketRoute = require("./routes/pocket-route");
const transactionRoute = require("./routes/transaction-route");
const errorMw = require("./middlewares/error-mw");
const notFoundMw = require("./middlewares/not-found-mw");

app.use(cors());
app.use(express.json());
app.use(morgan("dev"));

app.get("/", (req, res) => res.status(200).json({ message: "Hello Server" }));
app.use("/user", userRoute);
app.use("/pocket", pocketRoute);
app.use("/transaction", transactionRoute);

app.use(notFoundMw);
app.use(errorMw);

const port = process.env.PORT;
app.listen(port, () => console.log("server is running on port", port));
