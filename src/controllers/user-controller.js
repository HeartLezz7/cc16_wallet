exports.hello = (req, res, next) => {
  try {
    res.status(200).json({ message: "Hello User" });
  } catch (err) {
    next(err);
  }
};
