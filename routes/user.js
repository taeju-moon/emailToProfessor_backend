const router = require("express").Router();
const {
  getUsers,
  getUser,
  register,
  updateUser,
  deleteUser,
} = require("../controllers/user");
const { isAbleToChangeUser } = require("../middlewares/verify");

router.get("/", getUsers);

router.get("/:id", getUser);

router.post("/", register);

router.patch("/:id", isAbleToChangeUser, updateUser);

router.delete("/:id", isAbleToChangeUser, deleteUser);

module.exports = router;
