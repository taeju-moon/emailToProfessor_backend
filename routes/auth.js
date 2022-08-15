const router = require("express").Router();
const { login, logout, verify } = require("../controllers/auth");

router.post("/login", login);

router.post("/logout", logout);

router.get("/verify", verify);

module.exports = router;
