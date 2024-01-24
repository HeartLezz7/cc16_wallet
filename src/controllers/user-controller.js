const prisma = require("../config/prisma");
const createError = require("../utils/create-error");
const bcrypt = require("bcryptjs");

exports.hello = (req, res, next) => {
  try {
    res.status(200).json({ message: "Hello User" });
  } catch (err) {
    next(err);
  }
};

exports.register = async (req, res, next) => {
  try {
    const { email, firstName, lastName, phone, password } = req.body;
    // const hashedPw = await
    const newUser = await prisma.user.create({
      data: {
        email,
        password,
        firstName,
        lastName,
        phone,
      },
    });
    res.status(201).json({ message: "Registered successfully.", newUser });
  } catch (err) {
    next(err);
  }
};

exports.login = async (req, res, next) => {
  try {
    const { emailOrPhone, password } = req.body;
    const foundUser = await prisma.user.findFirst({
      where: {
        OR: [{ email: emailOrPhone }, { phone: emailOrPhone }],
        AND: {
          password,
        },
      },
    });
    if (!foundUser) {
      next(createError("Incorrect email, phone or password", 401));
      return;
    }
    res.status(200).json({ message: "hello", foundUser });
  } catch (err) {
    next(err);
  }
};
