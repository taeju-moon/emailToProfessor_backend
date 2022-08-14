const mongoose = require("mongoose");

const formSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  content: {
    type: String,
    required: true,
  },
  category: {
    type: String,
    required: true,
  },
  tags: {
    type: [String],
  },
  writer: {
    type: String,
    ref: "User",
  },
  stars: {
    type: Number,
    default: 0,
  },
});

module.exports = mongoose.model("Form", formSchema);
