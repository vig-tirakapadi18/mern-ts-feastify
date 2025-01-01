import { Request, Response } from "express";
import User from "../models/user.model";
import {
  CODE_200,
  CODE_400,
  ERROR_USER_CREATE,
  ERROR_USER_EXISTS,
  USER_CREATE_SUCCESS,
} from "../utils/constants";

export const createUser = async (
  req: Request,
  res: Response
): Promise<void> => {
  const userBody = req.body;

  try {
    const existingUser = await User.findOne({ auth0Id: userBody.auth0Id });

    if (existingUser) res.status(CODE_400).json({ message: ERROR_USER_EXISTS });

    const newUser = await User.create(userBody);

    if (!newUser) res.status(CODE_400).json({ message: ERROR_USER_CREATE });

    res
      .status(CODE_200)
      .json({
        success: true,
        data: { user: newUser },
        message: USER_CREATE_SUCCESS,
      });
  } catch (error) {
    console.log(error);
    res.status(CODE_400).json({ message: ERROR_USER_CREATE });
  }
};
