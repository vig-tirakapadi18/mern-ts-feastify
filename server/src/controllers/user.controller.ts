import { Request, Response } from "express";
import User from "../models/user.model";
import {
  CODE_200,
  CODE_400,
  CODE_404,
  ERROR_GETTING_USER,
  ERROR_USER_CREATE,
  ERROR_USER_EXISTS,
  ERROR_USER_NOT_FOUND,
  ERROR_USER_UPDATE,
  USER_CREATE_SUCCESS,
  USER_GET_SUCCESS,
  USER_UPDATE_SUCCESS,
} from "../utils/constants";

export const createUser = async (
  req: Request,
  res: Response
): Promise<void> => {
  const userBody = req.body;

  console.log(userBody);
  console.log("Hello");

  try {
    const existingUser = await User.findOne({ auth0Id: userBody.auth0Id });

    if (existingUser) res.status(CODE_400).json({ message: ERROR_USER_EXISTS });

    const newUser = await User.create(userBody);

    if (!newUser) res.status(CODE_400).json({ message: ERROR_USER_CREATE });

    res.status(CODE_200).json({
      success: true,
      data: { user: newUser },
      message: USER_CREATE_SUCCESS,
    });
  } catch (error) {
    console.log(error);
    res.status(CODE_400).json({ message: ERROR_USER_CREATE });
  }
};

export const updateUser = async (req: Request, res: Response) => {
  const { name, addressLine1, country, city } = req.body;
  try {
    const user = await User.findById(req.userId);

    if (!user) {
      res.status(CODE_404).json({ message: ERROR_USER_NOT_FOUND });
      return;
    }

    user.name = name;
    user.addressLine1 = addressLine1;
    user.country = country;
    user.city = city;

    await user.save();

    res.status(CODE_200).json({
      success: true,
      data: { user },
      message: USER_UPDATE_SUCCESS,
    });
  } catch (error) {
    console.log(error);
    res.status(CODE_400).json({ message: ERROR_USER_UPDATE });
    return;
  }
};

export const getLoggedInUser = async (req: Request, res: Response) => {
  try {
    const existingUser = await User.findOne({ _id: req.userId });

    if (!existingUser) {
      res.status(CODE_404).json({ message: ERROR_USER_NOT_FOUND });
      return;
    }

    res.status(CODE_200).json({
      success: true,
      data: { user: existingUser },
      message: USER_GET_SUCCESS,
    });
  } catch (error) {
    console.log("GET LOGGED IN USER", error);
    res.status(CODE_404).json({ message: ERROR_GETTING_USER });
  }
};
