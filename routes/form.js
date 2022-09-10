const router = require("express").Router();
const {
  getForms,
  getForm,
  createForm,
  updateForm,
  deleteForm,
} = require("../controllers/form");
const { isLoggedIn } = require("../middlewares/verify");
const sanitizer = require("../middlewares/sanitizer");

router.get("/", getForms);

router.get("/:id", getForm);

router.post("/", sanitizer, createForm);

router.patch("/:id", sanitizer, updateForm);

router.delete("/:id", isLoggedIn, deleteForm);

module.exports = router;
