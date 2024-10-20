const validateCredentials = (req, res, next) => {
  const { email, password } = req.body;

  if (!email) {
    return res.status(401).json({
      data: "email must not be empty",
    });
  }

  if (!password) {
    return res.status(401).json({
      data: "Password must not be empty",
    });
  }

  if (password.length < 6) {
    return res.status(401).json({
      data: "Password should not be less than six characters",
    });
  }
  next();
};

module.exports = validateCredentials;
