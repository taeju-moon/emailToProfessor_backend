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
const csrfProtection = require("../middlewares/csrf");

router.get("/", getForms);

router.get("/:id", getForm);

router.post("/", sanitizer, csrfProtection, isLoggedIn, createForm);

router.patch("/:id", sanitizer, csrfProtection, isLoggedIn, updateForm);

router.delete("/:id", isLoggedIn, deleteForm);

module.exports = router;
