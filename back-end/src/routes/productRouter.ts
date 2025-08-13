import express from "express";
import { addProduct, getAllProducts, getProduct } from "../services/productServices.js";

const route = express.Router();

route.post("/addproduct", async (req, res) => {
  try {
    const { title, image, price, stock } = req.body;
    const result = await addProduct({ title, image, price, stock });
    res.status(result.statusCode).send(result.message);
  } catch (error) {
    res.status(500).send("Somthing went wrong!");
  }
});

route.get("/", async (req, res) => {
  try {
    const result = await getAllProducts();
    res
      .status(result.statusCode)
      .send({ message: result.message, data: result.data });
  } catch (error) {
    res.status(500).send("Somthing went wrong!");
  }
});

route.get("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const result = await getProduct({ id });
    res
      .status(result.statusCode)
      .send({ message: result.message, data: result.data });
  } catch (error) {
    res.status(500).send("Somthing went wrong!");
  }
});

export default route;
