import { Request, Response } from "express";
import {
  booleanValues,
  CODE_200,
  CODE_201,
  CODE_400,
  CODE_401,
  CODE_404,
  CODE_409,
  CODE_500,
  ERROR_INTERNAL_SERVER_ERROR,
  ERROR_ORDER_NOT_FOUND,
  ERROR_ORDER_STATUS,
  ERROR_RESTAURANT_NOT_FOUND,
  ERROR_RESTAURANT_NOT_FOUND_ID,
  ERROR_UNAUTHORIZED,
  ERROR_USER_RESTAURANT_EXISTS,
  ORDERS_FETCH_SUCCESS,
  RESTAURANT_CREATE_SUCCESS,
  RESTAURANT_GET_SUCCESS,
  RESTAURANT_UPDATE_SUCCESS,
  STATUS_UPDATE_SUCCESS,
} from "../utils/constants";
import Restaurant from "../models/restaurant.model";
import { Types } from "mongoose";
import { uploadImage } from "../utils/uploadImage";
import Order from "../models/order.model";

export const createRestaurant = async (req: Request, res: Response) => {
  try {
    const existingRestaurant = await Restaurant.findOne({ user: req.userId });

    if (existingRestaurant) {
      res.status(CODE_409).json({ message: ERROR_USER_RESTAURANT_EXISTS });
      return;
    }

    const imgUrl = await uploadImage(req.file as Express.Multer.File);

    const restaurant = await Restaurant.create({
      ...req.body,
      imgUrl,
      user: new Types.ObjectId(req.userId),
      lastUpdated: new Date(),
    });

    res.status(CODE_201).json({
      success: true,
      restaurant,
      message: RESTAURANT_CREATE_SUCCESS,
    });
  } catch (error) {
    console.log("CREATE REST", error);
    res.status(CODE_500).json({ message: ERROR_INTERNAL_SERVER_ERROR });
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
        .status(CODE_404)
        .json({ success: false, message: ERROR_RESTAURANT_NOT_FOUND });
      return;
    }

    res
      .status(CODE_200)
      .json({ success: true, restaurant, message: RESTAURANT_GET_SUCCESS });
  } catch (error) {
    console.log("GET RESTAURANT", error);
    res
      .status(CODE_500)
      .json({ success: false, message: ERROR_INTERNAL_SERVER_ERROR });
  }
};

export const updateRestaurant = async (req: Request, res: Response) => {
  try {
    const restaurant = await Restaurant.findOne({ user: req.userId });

    if (!restaurant) {
      res.status(CODE_404).json({ message: ERROR_RESTAURANT_NOT_FOUND });
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

    res
      .status(CODE_200)
      .json({ success: true, restaurant, message: RESTAURANT_UPDATE_SUCCESS });
  } catch (error) {
    console.log("UPDATE RESTAURANT", error);
    res.status(CODE_500).json({ message: ERROR_INTERNAL_SERVER_ERROR });
  }
};

export const getRestaurantById = async (req: Request, res: Response) => {
  const { restaurantId } = req.params;

  if (!restaurantId) {
    res.status(CODE_404).json({ message: ERROR_RESTAURANT_NOT_FOUND_ID });
    return;
  }

  try {
    const restaurant = await Restaurant.findById(restaurantId);

    if (!restaurant) {
      res.status(CODE_404).json({ message: ERROR_RESTAURANT_NOT_FOUND_ID });
      return;
    }

    res
      .status(CODE_200)
      .json({ success: true, restaurant, message: RESTAURANT_GET_SUCCESS });
  } catch (error) {
    console.log("GET RESTAURANT BY ID", error);
    res.status(CODE_404).json({ message: ERROR_RESTAURANT_NOT_FOUND_ID });
  }
};

export const getThisRestaurantOrders = async (req: Request, res: Response) => {
  try {
    const restaurant = await Restaurant.findOne({ user: req.userId });

    if (!restaurant) {
      res
        .status(CODE_404)
        .json({ success: false, message: ERROR_RESTAURANT_NOT_FOUND });
      return;
    }

    const orders = await Order.find({ restaurant: restaurant._id })
      .populate("restaurant")
      .populate("user");

    res.status(CODE_200).json({
      success: booleanValues.trueValue,
      orders,
      message: ORDERS_FETCH_SUCCESS,
    });
  } catch (error) {
    console.log("GET THIS RESTAURANT ORDERS", error);
    res.status(CODE_500).json({
      success: booleanValues.falseValue,
      message: ERROR_INTERNAL_SERVER_ERROR,
    });
  }
};

export const updateOrderStatus = async (req: Request, res: Response) => {
  const { orderId } = req.params;

  const order = await Order.findById(orderId);

  if (!order) {
    res.status(CODE_404).json({
      success: booleanValues.falseValue,
      message: ERROR_ORDER_NOT_FOUND,
    });
    return;
  }

  const restaurant = await Restaurant.findById(order.restaurant);

  if (restaurant?.user?._id.toString() !== req.userId) {
    res
      .status(CODE_401)
      .json({ success: booleanValues.falseValue, message: ERROR_UNAUTHORIZED });
  }

  order.status = req.body.status;
  await order.save();

  res.status(CODE_200).json({
    success: booleanValues.trueValue,
    message: STATUS_UPDATE_SUCCESS,
    order,
  });
};
