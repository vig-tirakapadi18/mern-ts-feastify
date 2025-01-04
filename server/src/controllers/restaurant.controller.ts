import { Request, Response } from "express";
import {
  CODE_201,
  CODE_409,
  CODE_500,
  ERROR_INTERNAL_SERVER_ERROR,
  ERROR_USER_RESTAURANT_EXISTS,
  RESTAURANT_CREATE_SUCCESS,
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
