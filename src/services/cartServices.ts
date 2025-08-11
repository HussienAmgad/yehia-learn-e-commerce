import { cartModel } from "../models/cartModel.js";
import productModel from "../models/productModel.js";

interface CreateCartForUser {
  userId: String;
}

const createCartForUser = async ({ userId }: CreateCartForUser) => {
  const cart = await cartModel.create({ userId, totalAmount: 0 });
  await cart.save();
  return cart;
};

interface GetActiveCartForUser {
  userId: string;
}

export const getActiveCartForUser = async ({
  userId,
}: GetActiveCartForUser) => {
  let cart = await cartModel.findOne({ userId, status: "active" });

  if (!cart) {
    cart = await createCartForUser({ userId });
  }

  return cart;
};

interface AddItemToCart {
  userId: string;
  productId: string;
  quantity: number;
}

export const addItemToCart = async ({
  userId,
  productId,
  quantity,
}: AddItemToCart) => {
  const cart = await getActiveCartForUser({ userId });

  const existsInCart = cart.items.find(
    (p) => p.product.toString() === productId
  );
  const product = await productModel.findById(productId);

  if (!product) {
    return "Please check the product";
  }

  if (existsInCart) {
    if (existsInCart.quantity + quantity > product.stock) {
      return {
        statusCode: 400,
        message: `You have a ${existsInCart.quantity} and you want to add ${quantity} but the avilibale is ${product.stock}`,
      };
    }
    cart.totalAmount += quantity * product.price;
    existsInCart.unitPrice += quantity;
    return "sucsesc";
  }

  if (product.stock < quantity) {
    return "The quantity error";
  }

  cart.items.push({ product: productId, unitPrice: product.price, quantity });

  cart.totalAmount += product.price * quantity;

  const updateCart = await cart.save();

  return { message: "succsec", dsa: updateCart };
};

interface UpdateQuantityInCart {
  userId: string;
  productId: string;
  quantity: number;
}

export const updateQuantityInCart = async ({
  userId,
  productId,
  quantity,
}: UpdateQuantityInCart) => {
  const cart = await getActiveCartForUser({ userId });

  const existsInCart = cart.items.find(
    (p) => p.product.toString() === productId
  );
  
  if (!existsInCart) {
    return "Error";
  }
  const product = await productModel.findById(productId);

  if (!product) {
    return "Please check the product";
  }

  if (quantity > product.stock) {
    return {
      statusCode: 400,
      message: `You have a ${existsInCart.quantity} and you want to add ${quantity} but the avilibale is ${product.stock}`,
    };
  }

  existsInCart.quantity = quantity;
  existsInCart.unitPrice = quantity * product.price;

  const otherCartItems = cart.items.filter((p) => p.product.toString() !== productId);

  let total = otherCartItems.reduce((sum, product) => {
    sum += product.quantity * product.unitPrice;
    return sum;
  }, 0)

  total += existsInCart.quantity * existsInCart.unitPrice;

  cart.totalAmount = total

  const updateCart = await cart.save();

  return { data: updateCart, statusCode: 201}
};
