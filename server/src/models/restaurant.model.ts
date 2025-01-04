import { model, Schema } from "mongoose";

const menuItemSchema = new Schema(
  {
    name: { type: String, required: true },
    price: { type: Number, required: true },
  },
  { timestamps: true }
);

const restaurantSchema = new Schema(
  {
    user: { type: Schema.Types.ObjectId, ref: "User" },
    restaurantName: { type: String, required: true },
    city: { type: String, required: true },
    country: { type: String, required: true },
    imgUrl: { type: String },
    deliveyPrice: { type: Number, required: true },
    estimatedDeliveryTime: { type: Number, required: true },
    cuisines: [{ type: String, required: true }],
    menuItems: [menuItemSchema],
    lastUpdated: { type: Date, required: true },
  },
  { timestamps: true }
);

const RestaurantModel = model("Restaurant", restaurantSchema);

export default RestaurantModel;
