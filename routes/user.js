const router = require("express").Router();
const {
  getUsers,
  getUser,
  register,
  updateUser,
  deleteUser,
} = require("../controllers/user");
const { isAdmin, isAbleToChange } = require("../middlewares/verify");
const sanitizer = require("../middlewares/sanitizer");
const csrfProtection = require("../middlewares/csrf");

router.get("/", isAdmin, getUsers);

router.get("/:id", getUser);

router.post("/", sanitizer, register);

router.patch("/:id", sanitizer, isAbleToChange, updateUser);

router.delete("/:id", isAbleToChange, deleteUser);

module.exports = router;
