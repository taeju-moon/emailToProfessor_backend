const { Category } = require("../models/category");
const getCategories = (req, res) => {
  Category.find()
    .then((data) => res.status(200).json({ status: "success", data }))
    .catch((error) => res.status(400).json({ status: "error", error }));
};

const createCategory = (req, res) => {
  const category = new Category(req.body);
  category
    .save()
    .then((result) => res.status(200).json({ status: "success", result }))
    .catch((error) => res.status(400).json({ status: "fail", error }));
};

const deleteCategory = (req, res) => {
  Category.findByIdAndRemove(req.params.id)
    .then(() => res.status(200).json({ status: "success", message: "deleted" }))
    .catch((error) => res.status(400).json({ status: "fail", error }));
};

module.exports = {
  getCategories,
  createCategory,
  deleteCategory,
};
