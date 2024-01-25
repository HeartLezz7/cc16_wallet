const createError = require("../utils/create-error");
const prisma = require("../config/prisma");

exports.createAcc = async (req, res, next) => {
  try {
    if (!req.user) {
      next(createError("You're unauthorized.", 401));
      return;
    }
  } catch (err) {
    next(err);
  }
};

exports.getAll = async (req, res, next) => {
  try {
    // if (!req.user) {
    //   next(createError("You're unauthorized.", 401));
    //   return;
    // }
    const myAccounts = await prisma.account.findMany({
      where: {
        userId: +req.user.id,
      },
      include: {
        type,
      },
    });
    res.status(200).json(myAccounts);
  } catch (err) {
    next(err);
  }
};
