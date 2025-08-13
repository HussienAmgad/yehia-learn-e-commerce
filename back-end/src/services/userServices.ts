import userModel from "../models/userModel.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

interface RegisterParams {
  firstName: String;
  lastName: String;
  email: String;
  password: String;
}

export const register = async ({
  firstName,
  lastName,
  email,
  password,
}: RegisterParams) => {
  const findUser = await userModel.findOne({ email });

  if (findUser) {
    return {
      message: "This Email is already exists",
      token: "",
      statusCode: 409,
    };
  }

  const hashedpassword = await bcrypt.hash(password.toString(), 10);

  const newUser = new userModel({
    email,
    password: hashedpassword,
    firstName,
    lastName,
  });
  await newUser.save();

  return {
    message: "Account created successfully",
    token: generateJWT({
      firstName: firstName,
      lastName: lastName,
      email: email,
    }),
    statusCode: 201,
  };
};

interface LoginParams {
  email: string;
  password: String;
}

export const login = async ({ email, password }: LoginParams) => {
  const findUser = await userModel.findOne({ email });

  if (!findUser) {
    return {
      message: "This Email Not Found please register",
      token: "",
      statusCode: 404,
    };
  }

  const passwordMatch = await bcrypt.compare(
    password.toString(),
    findUser.password.toString()
  );
  if (passwordMatch) {
    return {
      message: "Account login successfully",
      name: `${findUser.firstName} ${findUser.lastName}`,
      token: generateJWT({
        firstName: findUser.firstName,
        lastName: findUser.lastName,
        email: findUser.email,
      }),
      statusCode: 200,
    };
  }

  return { message: "The Password is Not Correct", token: "", statusCode: 401 };
};

const generateJWT = (data: any) => {
  return jwt.sign(data, process.env.JWT_secret || "");
};
