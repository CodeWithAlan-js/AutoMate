const ensureAuthenticated = (req, res, next) => {
  if (req.isAuthenticated()) {
    return next();
  }
  res.status(401).json({
    message: "You need to be logged innnnn",
  });
};

export default ensureAuthenticated;
