const User = require("../models/user");

const login = (req, res) => {
  User.findOne({ user_id: req.body.user_id }, (err, user) => {
    if (!user) {
      return res.status(400).json({
        status: "fail",
        message: "제공된 이메일에 해당하는 유저가 없습니다.",
      });
    }
    user.comparePassword(req.body.password, (err, isMatch) => {
      if (String(isMatch) !== "true") {
        return res.status(400).json({
          status: "fail",
          message: "비밀번호가 틀렸습니다.",
        });
      } else {
        user.generateToken((err, user) => {
          if (err) return res.status(400).send(err);
          res
            .cookie("professorToken", user.token)
            .status(200)
            .json({ status: "success", user_id: user.user_id });
        });
      }
    });
  });
};

const logout = (req, res) => {
  //원하는 유저를 찾아서 토큰 삭제
  User.findOneAndUpdate(
    { user_id: req.cookies.user_id },
    { token: "" },
    (err, user) => {
      if (err) return res.status(400).json({ status: "fail", err });
      return res
        .status(200)
        .json({ status: "success", message: "User logout success" });
    }
  );
};

const verify = (req, res) => {
  const token = req.cookies.professorToken;
  User.findByToken(token, (err, user) => {
    if (err) throw err;
    if (!user)
      return res
        .status(401)
        .json({ status: "fail", message: "User not found" });
    else return res.status(200).json({ status: "success", data: { user } });
  });
};

module.exports = { login, logout, verify };
