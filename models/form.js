const mongoose = require("mongoose");

const formSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    description: "title is required",
  },
  content: {
    type: String,
    required: true,
    description: "content is required",
  },
  category: {
    type: String,
    required: true,
    description: "category is required",
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

const Form = mongoose.model("Form", formSchema);
module.exports = Form;
