const express = require("express");
const app = express();
const mongoose = require("mongoose");
const cookieParser = require("cookie-parser");
const morgan = require("morgan");
const helmet = require("helmet");
const hpp = require("hpp");
require("dotenv").config();

//helmet&morgan
if (process.env.NODE_ENV === "production") {
  app.use(morgan("combined"));
  app.use(helmet({ contentSecurityPolicy: false }));
  app.use(hpp());
} else {
  app.use(morgan("dev"));
}

//CORS
const cors = require("cors");

const corsOptions = {
  origin:
    process.env.NODE_ENV === "production"
      ? "http://localhost:30000"
      : "http://localhost:3000",
  credentials: true,
};

app.use(cors(corsOptions));

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

app.use("/forms", formRouter);
app.use("/users", userRouter);
app.use("/auth", authRouter);

//404
app.all("*", (req, res, next) => {
  res.status(404).json({ status: "fail", message: "404 Not Found" });
});

app.listen(process.env.BACKEND_PORT, () =>
  console.log("listening on BACKEND_PORT :" + process.env.BACKEND_PORT)
);
