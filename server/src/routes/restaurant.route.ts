import { Router } from "express";
import { createRestaurant } from "../controllers/restaurant.controller";
import { upload } from "../config/multer";
import { jwtCheck, jwtParse } from "../middlewares/auth";

const router = Router();

router
  .route("/")
  .post(jwtCheck, jwtParse, upload.single("imgFile"), createRestaurant);

export default router;
