const prisma = require("../config/prisma");
const createError = require("../utils/create-error");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const {
  registerSchema,
  loginSchema,
} = require("../validationSchema/authenSchema");
require("dotenv").config();

exports.register = async (req, res, next) => {
  try {
    const { error, value } = registerSchema.validate(req.body);
    if (error) {
      next(error);
      return;
    }
    const { email, firstName, lastName, phone, password } = value;
    const hashedPw = await bcrypt.hash(password, 12);
    const newUser = await prisma.user.create({
      data: {
        email,
        password: hashedPw,
        firstName,
        lastName,
        phone,
      },
    });
    delete newUser.password;
    res.status(201).json({ message: "Registered successfully.", newUser });
  } catch (err) {
    next(err);
  }
};

exports.login = async (req, res, next) => {
  try {
    const { error, value } = loginSchema.validate(req.body);
    if (error) {
      next(error);
      return;
    }
    const { emailOrPhone, password } = value;
    const foundUser = await prisma.user.findFirst({
      where: {
        OR: [{ email: emailOrPhone }, { phone: emailOrPhone }],
      },
    });
    if (!foundUser) {
      next(createError("Incorrect email, phone or password", 401));
      return;
    }
    const isMatchPw = await bcrypt.compare(password, foundUser.password);
    if (!isMatchPw) {
      next(createError("Incorrect email, phone or password", 401));
      return;
    }
    const payload = { userId: foundUser.id };
    const accessToken = jwt.sign(payload, process.env.JWT_SECRETKEY, {
      expiresIn: process.env.JWT_EXPIRES_IN,
    });
    foundUser.accessToken = accessToken;
    delete foundUser.password;
    res.status(200).json({ message: "Login successfully.", foundUser });
  } catch (err) {
    next(err);
  }
};
