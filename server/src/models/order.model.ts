import { model, Schema } from "mongoose";

const orderSchea = new Schema(
  {
    restaurant: { type: Schema.Types.ObjectId, ref: "Restaurant" },
    user: { type: Schema.Types.ObjectId, ref: "User" },
    deliveryDetails: {
      email: { type: String, required: true },
      name: { type: String, required: true },
      addressLine1: { type: String, required: true },
      city: { type: String, required: true },
    },
    cartItems: [
      {
        menuItemId: { type: String, required: true },
        quantity: { type: Number, required: true },
        name: { type: String, required: true },
      },
    ],
    totalAmount: Number,
    status: {
      type: String,
      enum: [
        "pending",
        "paid",
        "placed",
        "inProgress",
        "outForDelivery",
        "delivered",
      ],
    },
    createdAt: { type: Date, default: Date.now },
  },
  { timestamps: true }
);

const OrderModel = model("Order", orderSchea);

export default OrderModel;
