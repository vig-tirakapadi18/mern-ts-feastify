import { Request, Response } from "express";
import {
  booleanValues,
  errorMessages,
  statusCodes,
  successMessages,
} from "../utils/constants";
import Restaurant from "../models/restaurant.model";
import { Types } from "mongoose";
import { uploadImage } from "../utils/uploadImage";
import Order from "../models/order.model";

export const createRestaurant = async (req: Request, res: Response) => {
  try {
    const existingRestaurant = await Restaurant.findOne({ user: req.userId });

    if (existingRestaurant) {
      res
        .status(statusCodes.code409)
        .json({ message: errorMessages.userRestaurantExists });
      return;
    }

    const imgUrl = await uploadImage(req.file as Express.Multer.File);

    const restaurant = await Restaurant.create({
      ...req.body,
      imgUrl,
      user: new Types.ObjectId(req.userId),
      lastUpdated: new Date(),
    });

    res.status(statusCodes.code201).json({
      success: true,
      restaurant,
      message: successMessages.restaurantCreate,
    });
  } catch (error) {
    console.log("CREATE REST", error);
    res
      .status(statusCodes.code500)
      .json({ message: errorMessages.internalServerError });
  }
};

export const getLoggedInUserRestaurant = async (
  req: Request,
  res: Response
) => {
  try {
    const restaurant = await Restaurant.findOne({ user: req.userId });

    if (!restaurant) {
      res
        .status(statusCodes.code404)
        .json({ success: false, message: errorMessages.restaurantNotFound });
      return;
    }

    res.status(statusCodes.code200).json({
      success: true,
      restaurant,
      message: successMessages.restaurantGet,
    });
  } catch (error) {
    console.log("GET RESTAURANT", error);
    res
      .status(statusCodes.code500)
      .json({ success: false, message: errorMessages.internalServerError });
  }
};

export const updateRestaurant = async (req: Request, res: Response) => {
  try {
    const restaurant = await Restaurant.findOne({ user: req.userId });

    if (!restaurant) {
      res
        .status(statusCodes.code404)
        .json({ message: errorMessages.restaurantNotFound });
      return;
    }

    restaurant.restaurantName = req.body.restaurantName;
    restaurant.city = req.body.city;
    restaurant.country = req.body.country;
    restaurant.deliveryPrice = req.body.deliveryPrice;
    restaurant.estimatedDeliveryTime = req.body.estimatedDeliveryTime;
    restaurant.cuisines = req.body.cuisines;
    restaurant.menuItems = req.body.menuItems;
    restaurant.lastUpdated = new Date();

    if (req.file) {
      const imgUrl = await uploadImage(req.file as Express.Multer.File);
      restaurant.imgUrl = imgUrl;
    }

    await restaurant.save();

    res.status(statusCodes.code200).json({
      success: true,
      restaurant,
      message: successMessages.restaurantUpdate,
    });
  } catch (error) {
    console.log("UPDATE RESTAURANT", error);
    res
      .status(statusCodes.code500)
      .json({ message: errorMessages.internalServerError });
  }
};

export const getRestaurantById = async (req: Request, res: Response) => {
  const { restaurantId } = req.params;

  if (!restaurantId) {
    res
      .status(statusCodes.code404)
      .json({ message: errorMessages.restaurantNotFound });
    return;
  }

  try {
    const restaurant = await Restaurant.findById(restaurantId);

    if (!restaurant) {
      res
        .status(statusCodes.code404)
        .json({ message: errorMessages.restaurantNotFound });
      return;
    }

    res.status(statusCodes.code200).json({
      success: true,
      restaurant,
      message: successMessages.restaurantGet,
    });
  } catch (error) {
    console.log("GET RESTAURANT BY ID", error);
    res
      .status(statusCodes.code404)
      .json({ message: errorMessages.restaurantNotFound });
  }
};

export const getThisRestaurantOrders = async (req: Request, res: Response) => {
  try {
    const restaurant = await Restaurant.findOne({ user: req.userId });

    if (!restaurant) {
      res
        .status(statusCodes.code404)
        .json({ success: false, message: errorMessages.restaurantNotFound });
      return;
    }

    const orders = await Order.find({ restaurant: restaurant._id })
      .populate("restaurant")
      .populate("user");

    res.status(statusCodes.code200).json({
      success: booleanValues.trueValue,
      orders,
      message: successMessages.restaurantGet,
    });
  } catch (error) {
    console.log("GET THIS RESTAURANT ORDERS", error);
    res.status(statusCodes.code500).json({
      success: booleanValues.falseValue,
      message: errorMessages.internalServerError,
    });
  }
};

export const updateOrderStatus = async (req: Request, res: Response) => {
  const { orderId } = req.params;

  const order = await Order.findById(orderId);

  if (!order) {
    res.status(statusCodes.code404).json({
      success: booleanValues.falseValue,
      message: errorMessages.orderNotFound,
    });
    return;
  }

  const restaurant = await Restaurant.findById(order.restaurant);

  if (restaurant?.user?._id.toString() !== req.userId) {
    res.status(statusCodes.code401).json({
      success: booleanValues.falseValue,
      message: errorMessages.unauthorized,
    });
  }

  order.status = req.body.status;
  await order.save();

  res.status(statusCodes.code200).json({
    success: booleanValues.trueValue,
    message: successMessages.statusUpdate,
    order,
  });
};
