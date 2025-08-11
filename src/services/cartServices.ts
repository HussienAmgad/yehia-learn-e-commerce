import { cartModel } from "../models/cartModel.js";
import { orderModel, type IOrderItem } from "../models/orderModel.js";
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
    return { message: "Please check the product", statusCode: 404 };
  }

  if (existsInCart) {
    if (existsInCart.quantity + quantity > product.stock) {
      return {
        statusCode: 400,
        message: "Low Stock",
      };
    }
    cart.totalAmount += quantity * product.price;
    existsInCart.unitPrice += quantity;
    return { statusCode: 201, message: "Successfully Add The Product To cart" };
  }

  if (product.stock < quantity) {
    return { statusCode: 409, message: "Low Stock" };
  }

  cart.items.push({ product: productId, unitPrice: product.price, quantity });

  cart.totalAmount += product.price * quantity;

  await cart.save();

  return { message: "Successfully Add The Product To cart", statusCode: 201 };
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
    return { statusCode: 404, message: "Please Try Again" };
  }
  const product = await productModel.findById(productId);

  if (!product) {
    return { statusCode: 404, message: "We Not Found The Product" };
  }

  if (quantity > product.stock) {
    return {
      statusCode: 400,
      message: "Low Stock",
    };
  }

  existsInCart.quantity = quantity;
  existsInCart.unitPrice = quantity * product.price;

  const otherCartItems = cart.items.filter(
    (p) => p.product.toString() !== productId
  );

  let total = otherCartItems.reduce((sum, product) => {
    sum += product.quantity * product.unitPrice;
    return sum;
  }, 0);

  total += existsInCart.quantity * existsInCart.unitPrice;

  cart.totalAmount = total;

  await cart.save();

  return { message: "Quantity Updated Successfully", statusCode: 201 };
};

interface DeleteItemOfCart {
  userId: string;
  productId: any;
}

export const deleteItemOfCart = async ({
  productId,
  userId,
}: DeleteItemOfCart) => {
  const cart = await getActiveCartForUser({ userId });

  const existsInCart = cart.items.find(
    (p) => p.product.toString() === productId
  );

  if (!existsInCart) {
    return { statusCode: 404, message: "The Product Not Found In Cart" };
  }
  const product = await productModel.findById(productId);

  if (!product) {
    return { message: "Please check the product", statusCode: 404 };
  }

  const otherCartItems = cart.items.filter(
    (p) => p.product.toString() !== productId
  );

  let total = otherCartItems.reduce((sum, product) => {
    sum += product.quantity * product.unitPrice;
    return sum;
  }, 0);

  cart.totalAmount = total;
  cart.items = otherCartItems;

  const deleteitem = await cart.save();

  return { message: "The Item Was Deleted Successfully", statusCode: 200 };
};
interface DeleteAllItemsOfCart {
  userId: string;
}

export const deleteAllItemsOfCart = async ({
  userId,
}: DeleteAllItemsOfCart) => {
  const cart = await getActiveCartForUser({ userId });

  cart.totalAmount = 0;
  cart.items = [];

  const deleteitem = await cart.save();

  return { message: "The Cart Clear Successfully", statusCode: 200 };
};

interface Checkout {
  userId: string;
  address: string;
}

export const Checkout = async ({ userId, address }: Checkout) => {
  const cart = await getActiveCartForUser({ userId });

  const orderItems: IOrderItem[] = [];

  for (const item of cart.items) {
    const product = await productModel.findById(item.product);

    if (!product) {
      return { message: "Please check the product", statusCode: 404 };
    }

    const orderItem: IOrderItem = {
      productImage: product.image,
      productTitle: product.title,
      quantity: item.quantity,
      unitPrice: item.unitPrice,
    };
    orderItems.push(orderItem);
  }

  const order = await orderModel.create({
    orderItems,
    total: cart.totalAmount,
    address,
    userId,
  });

  await order.save();

  cart.status = "completed";

  await cart.save();

  return { statusCode: 201, message: "The Order Was Completed Successfully" };
};
