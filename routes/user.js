const router = require("express").Router();
const {
  getUsers,
  getUser,
  register,
  updateUser,
  deleteUser,
} = require("../controllers/user");
const { isAdmin, isAbleToChange } = require("../middlewares/verify");

router.get("/", isAdmin, getUsers);

router.get("/:id", getUser);

router.post("/", register);

router.patch("/:id", isAbleToChange, updateUser);

router.delete("/:id", isAbleToChange, deleteUser);

module.exports = router;
