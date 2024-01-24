exports.hello = (req, res, next) => {
  try {
    res.status(200).json({ message: "Hello Pocket" });
  } catch (err) {
    next(err);
  }
};
