const prisma = require("../config/prisma");
const createError = require("../utils/create-error");
const jwt = require("jsonwebtoken");
require("dotenv").config();

module.exports = async (req, res, next) => {
  try {
    const authorization = req.headers.authorization;
    if (!authorization || !authorization.startsWith("Bearer")) {
      next(createError("You're unauthorized.", 401));
      return;
    }
    const token = authorization.split(" ")[1];
    const payload = jwt.verify(token, process.env.JWT_SECRETKEY);
    const foundUser = await prisma.user.findUnique({
      where: {
        id: payload.userId,
      },
    });
    if (!foundUser) {
      next(createError("You're unauthorized", 401));
      return;
    }
    delete foundUser.password;
    req.user = foundUser;
    next();
  } catch (err) {
    if (err.name === "TokenExpiredError" || err.name === "JsonWebTokenError") {
      err.statusCode === 401;
    }
    next(err);
  }
};
