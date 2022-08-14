const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  id: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  nickname: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    enum: ["admin", "client"],
    required: true,
    description: "The name of role must be admin or client",
  },
});

module.exports = mongoose.model("User", userSchema);
