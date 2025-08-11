import Express from "express";
import {
  addItemToCart,
  getActiveCartForUser,
  updateQuantityInCart,
} from "../services/cartServices.js";
import validateJWT from "../middlewares/validateJWT.js";
import type { ExtendRequest } from "../types/extendedRequest.js";

const route = Express.Router();

route.get("/", validateJWT, async (req: ExtendRequest, res) => {
  const userId = req.user._id;
  const cart = await getActiveCartForUser({ userId });
  res.status(200).send(cart);
});

route.post("/items", validateJWT, async (req: ExtendRequest, res) => {
  const userId = req?.user?._id;
  const { quantity, productId } = req.body;
  const response = await addItemToCart({ userId, quantity, productId });
  res.send(response);
});

route.put("/count", validateJWT, async (req: ExtendRequest, res) => {
  const userId = req?.user?._id;
  const { quantity, productId } = req.body;
  const response = await updateQuantityInCart({ userId, quantity, productId });
  res.send(response);
});

export default route;
