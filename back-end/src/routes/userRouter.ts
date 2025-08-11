import express from "express";
import { login, register } from "../services/userServices.js";

const route = express.Router();

route.post("/register", async (req, res) => {
  try {
    const { firstName, lastName, email, password } = req.body;
    const result = await register({ firstName, lastName, email, password });
    res.status(result.statusCode).send({
      message: result.message,
      token: result.token,
    });
  } catch (error) {
    res.status(500).send("Somthing went wrong!");
  }
});

route.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    const result = await login({ email, password });
    res.status(result.statusCode).send({
      message: result.message,
      token: result.token,
    });
  } catch (error) {
    res.status(500).send("Somthing went wrong!");
  }
});

export default route;
