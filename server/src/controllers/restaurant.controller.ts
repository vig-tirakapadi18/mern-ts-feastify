import { Request, Response } from "express";
import {
  CODE_200,
  CODE_201,
  CODE_404,
  CODE_409,
  CODE_500,
  ERROR_INTERNAL_SERVER_ERROR,
  ERROR_RESTAURANT_NOT_FOUND,
  ERROR_USER_RESTAURANT_EXISTS,
  RESTAURANT_CREATE_SUCCESS,
  RESTAURANT_GET_SUCCESS,
} from "../utils/constants";
import Restaurant from "../models/restaurant.model";
import { v2 as cloudinary } from "cloudinary";
import { Types } from "mongoose";

export const createRestaurant = async (req: Request, res: Response) => {
  try {
    const existingRestaurant = await Restaurant.findOne({ user: req.userId });

    if (existingRestaurant) {
      res.status(CODE_409).json({ message: ERROR_USER_RESTAURANT_EXISTS });
      return;
    }

    const image = req.file as Express.Multer.File;
    const base64Image = Buffer.from(image.buffer).toString("base64");
    const dataURI = `data:${image.mimetype};base64,${base64Image}`;

    const uploadResponse = await cloudinary.uploader.upload(dataURI);

    const newRestaurant = await Restaurant.create({
      ...req.body,
      imgUrl: uploadResponse.url,
      user: new Types.ObjectId(req.userId),
      lastUpdated: new Date(),
    });

    res.status(CODE_201).json({
      success: true,
      newRestaurant,
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
      res.status(CODE_404).json({ success: false, message: ERROR_RESTAURANT_NOT_FOUND });
      return;
    }

    res.status(CODE_200).json({ success: true, restaurant, message: RESTAURANT_GET_SUCCESS });
  } catch (error) {
    console.log("GET RESTAURANT", error);
    res.status(CODE_500).json({ success: false, message: ERROR_INTERNAL_SERVER_ERROR });
  }
};
