const User = require("../models/user");

const isLoggedIn = (req, res, next) => {
  const token = req.cookies.professorToken;
  User.findByToken(token, (err, user) => {
    if (err) throw err;
    if (!user)
      return res
        .status(403)
        .json({ status: "fail", message: "로그인이 필요합니다." });
    next();
  });
};

const isAdmin = (req, res, next) => {
  const token = req.cookies.professorToken;
  User.findByToken(token, (err, user) => {
    if (err) throw err;
    if (!user)
      return res
        .status(403)
        .json({ status: "fail", message: "로그인이 필요합니다." });
    if (user.role !== "admin")
      return res
        .status(403)
        .json({ status: "fail", message: "접근 권한이 없습니다." });
    next();
  });
};

const isAbleToChange = (req, res, next) => {
  const token = req.cookies.professorToken;
  User.findByToken(token, (err, user) => {
    if (err) throw err;
    if (!user)
      return res
        .status(403)
        .json({ status: "fail", message: "로그인이 필요합니다." });
    if (user.role !== "admin" && user.user_id !== req.params.id) {
      return res
        .status(403)
        .json({ status: "fail", message: "접근 권한이 없습니다." });
    }
    next();
  });
};

module.exports = { isLoggedIn, isAdmin, isAbleToChange };
