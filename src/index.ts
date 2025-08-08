import express from "express";
import mongoose from "mongoose";
import userRouter from "./routes/userRouter.js";
// import cors from "cors";

const app = express();
const port = 5000;

// app.use(cors({
//     origin: "http://localhost:5173"
// }));
app.use(express.json());

mongoose
  .connect("mongodb://localhost:27017/ecommerce")
  .then(() => console.log("Connected!"))
  .catch((err) => console.log("Faild to connect", err));

app.use("/user", userRouter);

app.listen(port, () => {
  console.log("Running on port " + port);
});
