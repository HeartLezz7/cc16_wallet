const createError = require("../utils/create-error");
const prisma = require("../config/prisma");

exports.getAll = async (req, res, next) => {
  try {
    const myAccounts = await prisma.account.findMany({
      where: {
        userId: +req.user.id,
        deletedAt: null,
      },
    });
    res.status(200).json(myAccounts);
  } catch (err) {
    next(err);
  }
};

exports.createAccount = async (req, res, next) => {
  try {
    const prepareData = req.body;
    const userId = +req.user.id;
    prepareData.userId = userId;
    const createAccount = await prisma.account.create({
      data: prepareData,
    });
    res.status(201).json(createAccount);
  } catch (error) {
    next(error);
  }
};

exports.deleteAccount = async (req, res, next) => {
  try {
    const { accountId } = req.params;
    const checkId = await prisma.account.findUnique({
      where: { id: +accountId },
    });

    if (!checkId) {
      throw new Error("account ID not found");
    }
    const deleteAccount = await prisma.account.update({
      data: { deletedAt: new Date() },
      where: { id: +accountId },
    });
    res.status(200).json(`soft delete account: ${accountId} completed`);
  } catch (error) {
    next(error);
  }
};

exports.editAccount = async (req, res, next) => {
  try {
    const data = req.body;
    const { accountId } = req.params;
    const checkId = await prisma.account.findUnique({
      where: { id: +accountId },
    });

    if (!checkId) {
      throw new Error("account ID not found");
    }
    const editAccount = await prisma.account.update({
      data: data,
      where: {
        id: +accountId,
      },
    });
    res
      .status(200)
      .json({
        message: `update account id: ${accountId} completed`,
        editAccount,
      });
  } catch (error) {
    next(error);
  }
};
