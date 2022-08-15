const router = require("express").Router();
const {
  getForms,
  getForm,
  createForm,
  updateForm,
  deleteForm,
} = require("../controllers/form");
const { isLoggedIn } = require("../middlewares/verify");

router.get("/", getForms);

router.get("/:id", getForm);

router.post("/", isLoggedIn, createForm);

router.patch("/:id", isLoggedIn, updateForm);

router.delete("/:id", isLoggedIn, deleteForm);

module.exports = router;
