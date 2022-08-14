const router = require("express").Router();
const {
  getForms,
  getForm,
  createForm,
  updateForm,
  deleteForm,
} = require("../controllers/form");

router.get("/", getForms);

router.get("/:id", getForm);

router.post("/", createForm);

router.put("/:id", updateForm);

router.delete("/:id", deleteForm);

module.exports = router;
