import { body, validationResult } from "express-validator";
import {
  ADDRESS_STRING,
  CITY_STRING,
  CODE_400,
  COUNTRY_STRING,
  NAME_STRING,
} from "../utils/constants";
import { NextFunction, Request, Response } from "express";

const handleValidationErrors = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    res.status(CODE_400).json({ errors });
    return;
  }
  next();
};

export const validateUserRequest = [
  body("name").isString().notEmpty().withMessage(NAME_STRING),
  body("addressLine1").isString().notEmpty().withMessage(ADDRESS_STRING),
  body("city").isString().notEmpty().withMessage(CITY_STRING),
  body("country").isString().notEmpty().withMessage(COUNTRY_STRING),
  handleValidationErrors,
];
