const express = require("express");
const morgan = require("morgan");
const app = express();
const cors = require("cors");

const userRoute = require("./routes/user-route");
const pocketRoute = require("./routes/pocket-route");
const transactionRoute = require("./routes/transaction-route");
const errorMw = require("./middlewares/error-mw");
const notFoundMw = require("./middlewares/not-found-mw");

app.use(cors());
app.use(express.json());
app.use(morgan("dev"));

app.use("/user", userRoute);
app.use("/pocket", pocketRoute);
app.use("/transaction", transactionRoute);

app.use(notFoundMw);
app.use(errorMw);

app.listen(8000, () => console.log("server is running on port", 8000));
