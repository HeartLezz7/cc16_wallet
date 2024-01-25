const prisma = require("../config/prisma");

exports.getAllTransactionsById = async (req, res, next) => {
  try {
    const { accId } = req.params;
    const transactions = await prisma.transaction.findMany({
      where: { OR: [{ senderId: +accId }, { receiverId: +accId }] },
    });
    res.status(200).json(transactions);
  } catch (err) {
    next(err);
  }
};

exports.createTransaction = async (req, res, next) => {
  try {
    const {} = req.body;
    const transaction = await prisma.transaction.create({ data: req.body });
  } catch (err) {
    next(err);
  }
};

exports.updateTransaction = async (req, res, next) => {
  try {
    const { tranId } = req.params;
    const foundTransaction = await prisma.transaction.findUnique({
      where: { id: +tranId },
    });

    if (!foundTransaction) {
      res.status(400).json({ message: "NOT FOUND TRANSACTION" });
      return;
    }

    const updateTransaction = await prisma.transaction.update({
      where: { id: +tranId },
    });

    res.status(200).json(updateTransaction);
  } catch (err) {
    next(err);
  }
};

exports.deleteTransaction = async (req, res, next) => {
  try {
    const { tranId } = req.params;
    const deleteItem = await prisma.transaction.delete({
      where: { id: +tranId },
    });
    res.status(200).json({ message: "DELETE SUCCESS" });
  } catch (err) {
    next(err);
  }
};
