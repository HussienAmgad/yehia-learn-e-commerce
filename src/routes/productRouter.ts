import express from "express";
import { addProduct, getAllProducts } from "../services/productServices.js";

const route = express.Router();

route.post("/addproduct", async (req, res) => {
  const { title, image, price, stock } = req.body;
  const result = await addProduct({ title, image, price, stock });
  res.status(result.statusCode).send(result.message);
});

route.get("/", async (req, res) => {
  const result = await getAllProducts();
  res
    .status(result.statusCode)
    .send({ message: result.message, data: result.data });
});

export default route;
