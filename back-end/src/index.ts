import dotenv from "dotenv";
import express from "express";
import mongoose from "mongoose";
import userRouter from "./routes/userRouter.js";
import productRouter from "./routes/productRouter.js";
import cartRout from "./routes/cartRouter.js";
// import cors from "cors";

dotenv.config();

const app = express();
const port = 5000;

// app.use(cors({
//     origin: "http://localhost:5173"
// }));
app.use(express.json());

mongoose
  .connect(process.env.url || "")
  .then(() => console.log("Connected!"))
  .catch((err) => console.log("Faild to connect", err));

app.use("/user", userRouter);
app.use("/product", productRouter);
app.use("/cart", cartRout);

app.listen(port, () => {
  console.log("Running on port " + port);
});
