import { model, Schema } from "mongoose";

const userSchema = new Schema(
  {
    auth0Id: {
      type: String,
      required: true,
      unique: true,
    },
    name: { type: String },
    email: { type: String, required: true },
    addressLine1: { type: String },
    city: { type: String },
    country: { type: String },
  },
  { timestamps: true }
);

const UserModel = model("User", userSchema);

export default UserModel;
