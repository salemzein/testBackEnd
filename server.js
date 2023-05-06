const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const mongoose = require("mongoose");
const userRouter = require("./router/userRouter");
const categoryRouter = require("./router/categoryRouter");
const productRouter = require("./router/productRouter");
dotenv.config();
const app = express();
app.use(express.json());
app.use(cookieParser());
app.use(cors());

//router

app.use("/", userRouter);
app.use("/", categoryRouter);
app.use("/", productRouter);

//connect to mongoose
mongoose
  .connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("connected to mongoDB");
  })
  .catch((err) => {
    console.log(err);
  });

// tester
// app.get("/", (req, res) => {
//   res.json({ msg: "wlcome to calnel" });
// });
const Port = process.env.Port;

app.listen(Port || 6000, () => {
  console.log(`server is running on port ${Port}`);
});
