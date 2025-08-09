import Express from "express";
import { getActiveCartForUser } from "../services/cartServices.js";
import validateJWT from "../middlewares/validateJWT.js";

const route = Express.Router();

route.get("/", validateJWT, async (req, res) => {
  const userId = (req as any).user._id;
  const cart = await getActiveCartForUser({ userId });
  res.status(200).send(cart);
});

export default route;
