const router = require("express").Router();
const {
  createCount,
  getCount,
  addAccessTime,
  addCopiedTime,
} = require("../controllers/count");

router.post("/", createCount);

router.get("/", getCount);

router.patch("/accessTime", addAccessTime);

router.patch("/copiedTime", addCopiedTime);

module.exports = router;
