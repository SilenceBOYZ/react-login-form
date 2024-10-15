const validateInputData = (req, res, next) => {
  try {
    const data = req.body;
    if (!Object.keys(data).length) {
      res.status(400).json("There are no input data");
      return;
    } else
      next();
  } catch (err) {
    res.status(500).json("Error in validate middleware: " + err.message);
    return;
  }
}

module.exports = {
  validateInputData
}