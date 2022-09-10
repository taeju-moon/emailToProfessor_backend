const mongoose = require("mongoose");

const categorySchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true,
    description: "category name is required and unique",
  },
  id: {
    type: Number,
    unique: true,
  },
});

const Category = mongoose.model("Category", categorySchema);
module.exports = {
  Category,
  categorySchema,
};
