import { body, param, validationResult } from "express-validator";
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

export const validateRestaurantRequest = [
  body("restaurantName").notEmpty().withMessage("Restaurant name is required!"),
  body("city").notEmpty().withMessage("City is required!"),
  body("country").notEmpty().withMessage("Country is required!"),
  body("deliveryPrice")
    .isFloat({ min: 0 })
    .withMessage("Delivery price must be a positive number!"),
  body("estimatedDeliveryTime")
    .isInt({ min: 0 })
    .withMessage("Estimated delivery time must be a positive integer!"),
  body("cuisines")
    .isArray()
    .withMessage("Cuisines must be an array!")
    .not()
    .isEmpty()
    .withMessage("Cuisines array can not be empty!"),
  body("menuItems").isArray().withMessage("Menu items must be an array!"),
  body("menuItems.*.name")
    .notEmpty()
    .withMessage("Menu item name is required!"),
  body("menuItems.*.price")
    .isFloat({ min: 0 })
    .withMessage("Menu item price is required and must be a positive integer!"),
  handleValidationErrors,
];

export const validateParam = (paramName: string) => {
  return param(paramName)
    .isString()
    .trim()
    .notEmpty()
    .withMessage("Parameter must be a valid string!");
};
