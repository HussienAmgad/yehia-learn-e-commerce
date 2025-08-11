import Express from "express";
import {
  addItemToCart,
  getActiveCartForUser,
  updateQuantityInCart,
  deleteItemOfCart,
  deleteAllItemsOfCart,
  Checkout,
} from "../services/cartServices.js";
import validateJWT from "../middlewares/validateJWT.js";
import type { ExtendRequest } from "../types/extendedRequest.js";

const route = Express.Router();

route.get("/", validateJWT, async (req: ExtendRequest, res) => {
  try {
    const userId = req.user._id;
    const cart = await getActiveCartForUser({ userId });
    res.status(200).send({ message: "The Get Respons Succsses" });
  } catch (error) {
    res.status(500).send("Somthing went wrong!");
  }
});

route.post("/items", validateJWT, async (req: ExtendRequest, res) => {
  try {
    const userId = req?.user?._id;
    const { quantity, productId } = req.body;
    const response = await addItemToCart({ userId, quantity, productId });
    res.status(response.statusCode).send({ message: response.message });
  } catch (error) {
    res.status(500).send("Somthing went wrong!");
  }
});

route.delete(
  "/item/:productId",
  validateJWT,
  async (req: ExtendRequest, res) => {
    try {
      const userId = req?.user?._id;
      const { productId } = req.params;
      const response = await deleteItemOfCart({ userId, productId });
      res.status(response.statusCode).send({ message: response.message });
    } catch (error) {
      res.status(500).send("Somthing went wrong!");
    }
  }
);

route.delete("/items", validateJWT, async (req: ExtendRequest, res) => {
  try {
    const userId = req?.user?._id;
    const response = await deleteAllItemsOfCart({ userId });
    res.status(response.statusCode).send({ message: response.message });
  } catch (error) {
    res.status(500).send("Somthing went wrong!");
  }
});

route.put("/count", validateJWT, async (req: ExtendRequest, res) => {
  try {
    const userId = req?.user?._id;
    const { quantity, productId } = req.body;
    const response = await updateQuantityInCart({
      userId,
      quantity,
      productId,
    });
    res.status(response.statusCode).send({ message: response.message });
  } catch (error) {
    res.status(500).send("Somthing went wrong!");
  }
});

route.post("/checkout", validateJWT, async (req: ExtendRequest, res) => {
  try {
    const userId = req?.user?._id;
    const { address } = req.body;
    const response = await Checkout({ userId, address });
    res.status(response.statusCode).send({ message: response.message });
  } catch (error) {
    res.status(500).send("Somthing went wrong!");
  }
});

export default route;
