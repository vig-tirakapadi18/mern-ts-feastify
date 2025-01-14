import { body, param, validationResult } from "express-validator";
import { formValidationErrorMessages, statusCodes } from "../utils/constants";
import { NextFunction, Request, Response } from "express";

const handleValidationErrors = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    res.status(statusCodes.code400).json({ errors });
    return;
  }
  next();
};

export const validateUserRequest = [
  body("name")
    .isString()
    .notEmpty()
    .withMessage(formValidationErrorMessages.nameString),
  body("addressLine1")
    .isString()
    .notEmpty()
    .withMessage(formValidationErrorMessages.addressString),
  body("city")
    .isString()
    .notEmpty()
    .withMessage(formValidationErrorMessages.cityString),
  body("country")
    .isString()
    .notEmpty()
    .withMessage(formValidationErrorMessages.countryString),
  handleValidationErrors,
];

export const validateRestaurantRequest = [
  body("restaurantName")
    .notEmpty()
    .withMessage(formValidationErrorMessages.restaurantRequired),
  body("city").notEmpty().withMessage(formValidationErrorMessages.cityRequired),
  body("country")
    .notEmpty()
    .withMessage(formValidationErrorMessages.countryRequired),
  body("deliveryPrice")
    .isFloat({ min: 0 })
    .withMessage(formValidationErrorMessages.deliveryPricePositive),
  body("estimatedDeliveryTime")
    .isInt({ min: 0 })
    .withMessage(formValidationErrorMessages.estimatedDeliveryTimePositive),
  body("cuisines")
    .isArray()
    .withMessage(formValidationErrorMessages.cuisinesArray)
    .not()
    .isEmpty()
    .withMessage(formValidationErrorMessages.cuisinesArrayNotEmpty),
  body("menuItems")
    .isArray()
    .withMessage(formValidationErrorMessages.menuItemsArray),
  body("menuItems.*.name")
    .notEmpty()
    .withMessage(formValidationErrorMessages.menuItemRequired),
  body("menuItems.*.price")
    .isFloat({ min: 0 })
    .withMessage(formValidationErrorMessages.menuItemRequiredAndString),
  handleValidationErrors,
];

export const validateParam = (paramName: string) => {
  return param(paramName)
    .isString()
    .trim()
    .notEmpty()
    .withMessage(formValidationErrorMessages.parameterString);
};
