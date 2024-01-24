exports.hello = (req, res, next) => {
  try {
    res.status(200).json({ message: "Hello Transaction" });
  } catch (err) {
    next(err);
  }
};
