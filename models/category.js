const mongoose = require("mongoose");

const categorySchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true,
    description: "category name is required and unique",
  },
});

const Category = mongoose.model("Category", categorySchema);
module.exports = {
  Category,
  categorySchema,
};
