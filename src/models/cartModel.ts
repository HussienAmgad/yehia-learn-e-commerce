import mongoose, { Schema, type Document } from "mongoose";
import type { IProduct } from "./productModel.js";

const CartStatusEnum = ["active", "completed"];

export interface ICartItem extends Document {
  product: IProduct;
  unitPrice: number;
  quantity: number;
}

export interface ICart extends Document {
  userId: String;
  items: ICartItem[];
  totalAmount: number;
  status: "active" | "completed";
}

const cartItemSchema = new Schema<ICartItem>({
  product: { type: Schema.Types.ObjectId, ref: "Product", required: true },
  quantity: { type: Number, required: true, default: 0 },
  unitPrice: { type: Number, required: true },
});

const cartSchema = new Schema<ICart>({
  userId: { type: Schema.Types.ObjectId, ref: "User", required: true },
  items: [cartItemSchema],
  totalAmount: { type: Number },
  status: { type: String, enum: CartStatusEnum, default: "active" },
});

export const cartModel = mongoose.model<ICart>("Cart", cartSchema);
