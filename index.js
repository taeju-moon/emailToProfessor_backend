const express = require("express");
const app = express();
const mongoose = require("mongoose");
const cookieParser = require("cookie-parser");
require("dotenv").config();

app.use(express.json());
app.use(cookieParser());

mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("몽고디비 연결완료"))
  .catch((error) => console.log(error));

//라우팅
const formRouter = require("./routes/form");
const userRouter = require("./routes/user");
const authRouter = require("./routes/auth");

app.use("/form", formRouter);
app.use("/user", userRouter);
app.use("/auth", authRouter);

app.listen(process.env.PORT, () =>
  console.log("listening on port :" + process.env.PORT)
);
