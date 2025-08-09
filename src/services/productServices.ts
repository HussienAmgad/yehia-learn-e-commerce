import productModel from "../models/productModel.js";

interface ProductParams {
  title: String;
  image: String;
  price: number;
  stock: number;
}

export const addProduct = async ({
  title,
  image,
  price,
  stock,
}: ProductParams) => {
  const newProduct = new productModel({
    title,
    image,
    price,
    stock,
  });

  await newProduct.save();

  return { message: "Product Added Successfully", statusCode: 201 };
};

export const getAllProducts = async () => {
  const products = await productModel.find();
  if (products.length === 0) {
    return { statusCode: 404, message: "No products found", data: products };
  }
  return { statusCode: 200, message: "Get All Products Successfully", data: products };
};
