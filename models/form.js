const mongoose = require("mongoose");
const { categorySchema } = require("./category");

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
    type: categorySchema,
    required: true,
    description: "category is required",
  },
  writer: {
    type: String,
  },
  stars: {
    type: Number,
    default: 0,
  },
});

const Form = mongoose.model("Form", formSchema);
module.exports = Form;
