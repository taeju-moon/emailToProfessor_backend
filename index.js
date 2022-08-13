const express = require("express");
const app = express();
const mongoose = require("mongoose");
require("dotenv").config();

mongoose
  .connect(process.env.MONGO_URI, {})
  .then(() => console.log("몽고디비 연결완료"))
  .catch((error) => console.log(error));

//라우팅
const formRouter = require("./routes/form");
const userRouter = require("./routes/user");

app.use("/form", formRouter);
app.use("/user", userRouter);

app.listen(process.env.PORT, () =>
  console.log("listening on port :" + process.env.PORT)
);
