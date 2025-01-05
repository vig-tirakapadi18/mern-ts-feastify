import { Router } from "express";
import { createRestaurant, getLoggedInUserRestaurant } from "../controllers/restaurant.controller";
import { upload } from "../config/multer";
import { jwtCheck, jwtParse } from "../middlewares/auth";
import { validateRestaurantRequest } from "../middlewares/validation";

const router = Router();

router
  .route("/").get(jwtCheck, jwtParse, getLoggedInUserRestaurant)
  .post(
    upload.single("imgFile"),
    validateRestaurantRequest,
    jwtCheck,
    jwtParse,
    createRestaurant
  );

export default router;
