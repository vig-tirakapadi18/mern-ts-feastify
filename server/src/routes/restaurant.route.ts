import { Router } from "express";
import {
  createRestaurant,
  getLoggedInUserRestaurant,
  updateRestaurant,
} from "../controllers/restaurant.controller";
import { upload } from "../config/multer";
import { jwtCheck, jwtParse } from "../middlewares/auth";
import { validateRestaurantRequest } from "../middlewares/validation";

const router = Router();

router
  .route("/")
  .get(jwtCheck, jwtParse, getLoggedInUserRestaurant)
  .post(
    upload.single("imgFile"),
    validateRestaurantRequest,
    jwtCheck,
    jwtParse,
    createRestaurant
  );

router
  .route("/update-restaurant")
  .put(
    upload.single("imgFile"),
    validateRestaurantRequest,
    jwtCheck,
    jwtParse,
    updateRestaurant
  );

export default router;
