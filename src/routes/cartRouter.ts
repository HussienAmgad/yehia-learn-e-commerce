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
  const userId = req.user._id;
  const cart = await getActiveCartForUser({ userId });
  res.status(200).send({ message: "The Get Respons Succsses" });
});

route.post("/items", validateJWT, async (req: ExtendRequest, res) => {
  const userId = req?.user?._id;
  const { quantity, productId } = req.body;
  const response = await addItemToCart({ userId, quantity, productId });
  res.status(response.statusCode).send({ message: response.message });
});

route.delete(
  "/item/:productId",
  validateJWT,
  async (req: ExtendRequest, res) => {
    const userId = req?.user?._id;
    const { productId } = req.params;
    const response = await deleteItemOfCart({ userId, productId });
    res.status(response.statusCode).send({ message: response.message });
  }
);

route.delete("/items", validateJWT, async (req: ExtendRequest, res) => {
  const userId = req?.user?._id;
  const response = await deleteAllItemsOfCart({ userId });
  res.status(response.statusCode).send({ message: response.message });
});

route.put("/count", validateJWT, async (req: ExtendRequest, res) => {
  const userId = req?.user?._id;
  const { quantity, productId } = req.body;
  const response = await updateQuantityInCart({ userId, quantity, productId });
  res.status(response.statusCode).send({ message: response.message });
});

route.post("/checkout", validateJWT, async (req: ExtendRequest, res) => {
  const userId = req?.user?._id;
  const { address } = req.body;
  const response = await Checkout({ userId, address });
  res.status(response.statusCode).send({ message: response.message });
});

export default route;
