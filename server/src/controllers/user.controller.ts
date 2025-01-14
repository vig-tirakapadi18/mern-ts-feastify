import { Request, Response } from "express";
import User from "../models/user.model";
import {
  errorMessages,
  statusCodes,
  successMessages,
} from "../utils/constants";

export const createUser = async (
  req: Request,
  res: Response
): Promise<void> => {
  const userBody = req.body;

  try {
    const existingUser = await User.findOne({ auth0Id: userBody.auth0Id });

    if (existingUser)
      res
        .status(statusCodes.code400)
        .json({ message: errorMessages.userExists });

    const newUser = await User.create(userBody);

    if (!newUser)
      res
        .status(statusCodes.code400)
        .json({ message: errorMessages.userCreate });

    res.status(statusCodes.code200).json({
      success: true,
      data: { user: newUser },
      message: successMessages.userCreate,
    });
  } catch (error) {
    console.log(error);
    res.status(statusCodes.code400).json({ message: errorMessages.userCreate });
  }
};

export const updateUser = async (req: Request, res: Response) => {
  const { name, addressLine1, country, city } = req.body;
  try {
    const user = await User.findById(req.userId);

    if (!user) {
      res
        .status(statusCodes.code404)
        .json({ message: errorMessages.userNotFound });
      return;
    }

    user.name = name;
    user.addressLine1 = addressLine1;
    user.country = country;
    user.city = city;

    await user.save();

    res.status(statusCodes.code200).json({
      success: true,
      data: { user },
      message: successMessages.userUpdate,
    });
  } catch (error) {
    console.log(error);
    res.status(statusCodes.code400).json({ message: errorMessages.userUpdate });
    return;
  }
};

export const getLoggedInUser = async (req: Request, res: Response) => {
  try {
    const existingUser = await User.findOne({ _id: req.userId });

    if (!existingUser) {
      res
        .status(statusCodes.code404)
        .json({ message: errorMessages.userNotFound });
      return;
    }

    res.status(statusCodes.code200).json({
      success: true,
      existingUser,
      message: successMessages.userGet,
    });
  } catch (error) {
    console.log("GET LOGGED IN USER", error);
    res
      .status(statusCodes.code404)
      .json({ message: errorMessages.gettingUser });
  }
};
