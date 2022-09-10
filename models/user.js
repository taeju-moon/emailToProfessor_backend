const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const userSchema = new mongoose.Schema({
  user_id: {
    type: String,
    required: true,
    unique: true,
    description: "Id is required and unique identifier",
  },
  password: {
    type: String,
    required: true,
    description: "Password is required",
  },
  nickname: {
    type: String,
    required: true,
    description: "Nickname is requried",
  },
  role: {
    type: String,
    enum: ["admin", "client"],
    required: true,
    description: "The name of role must be admin or client",
  },
  token: {
    type: String,
  },
});

userSchema.pre("save", function (next) {
  const user = this;
  if (user.isModified("password")) {
    bcrypt.genSalt(Number(process.env.SALT_ROUNDS), function (err, salt) {
      if (err) return next(err);
      bcrypt.hash(user.password, salt, function (err, hashedPW) {
        if (err) return next(err);
        user.password = hashedPW;
        next();
      });
    });
  } else {
    next();
  }
});

userSchema.methods.comparePassword = function (plainPassword, callback) {
  bcrypt
    .compare(plainPassword, this.password)
    .then((isMatch) => {
      console.log(isMatch);
      callback(null, isMatch);
    })
    .catch((err) => callback(err));
};

userSchema.methods.generateToken = function (callback) {
  const user = this;
  const token = jwt.sign(
    {
      data: user._id.toHexString(),
      exp: Math.floor(Date.now() / 1000) + 60 * 60,
    },
    process.env.SECRET_TOKEN
  );
  user.token = token;
  console.log(user);
  user
    .save()
    .then(() => callback(null, user))
    .catch((error) => callback(error));
};

userSchema.statics.findByToken = function (token, callback) {
  const user = this;
  jwt.verify(token, process.env.SECRET_TOKEN, function (err, decoded) {
    user
      .findOne({ _id: decoded ? decoded.data : undefined, token: token })
      .then((user) => callback(null, user))
      .catch((error) => callback(error));
  });
};

const User = mongoose.model("User", userSchema);

module.exports = User;
