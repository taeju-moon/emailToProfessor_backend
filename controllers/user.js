const User = require("../models/User");

const getUsers = (req, res) => {
  User.find()
    .then((users) =>
      res.status(200).json({
        status: "success",
        data: { users },
      })
    )
    .catch((err) =>
      res.status(400).json({
        status: "fail",
        error: err,
      })
    );
};

const getUser = (req, res) => {
  User.findOne({ user_id: req.params.user_id })
    .then((user) =>
      res.status(200).json({
        status: "success",
        data: { user },
      })
    )
    .catch((error) =>
      res.status(400).json({
        status: "fail",
        error,
      })
    );
};

const register = (req, res) => {
  const user = new User(req.body);
  user
    .save()
    .then((user) => res.status(200).json({ status: "success", data: { user } }))
    .catch((error) => res.status(400).json({ status: "fail", error }));
};

const updateUser = (req, res) => {
  User.findOneAndUpdate({ user_id: req.params.id }, req.body)
    .then((result) => res.status(200).json({ status: "success", result }))
    .catch((err) => res.status(400).json({ status: "fail", err }));
};

const deleteUser = (req, res) => {
  User.findOneAndDelete({ user_id: req.params.user_id })
    .then(() =>
      res.status(200).json({ status: "success", message: "user deleted" })
    )
    .catch((err) => res.status(400).json({ status: "fail", err }));
};

module.exports = { getUsers, getUser, register, updateUser, deleteUser };
