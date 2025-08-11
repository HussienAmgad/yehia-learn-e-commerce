import mongoose, { Document, Schema } from "mongoose";

export interface IUser extends Document {
  firstName: String;
  lastName: String;
  email: String;
  password: String;
}

const userSchema = new Schema<IUser>({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  email: { type: String, required: true },
  password: { type: String, required: true },
});

const userModel = mongoose.model<IUser>("User", userSchema);

export default userModel;