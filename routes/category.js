const router = require("express").Router();
const {
  getCategories,
  createCategory,
  deleteCategory,
} = require("../controllers/category");

router.get("/", getCategories);

router.post("/", createCategory);

router.delete("/:id", deleteCategory);

module.exports = router;
