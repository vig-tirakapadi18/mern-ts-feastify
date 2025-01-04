import { Router } from "express";
import { createRestaurant } from "../controllers/restaurant.controller";
import { upload } from "../config/multer";

const router = Router();

router.route("/").post(upload.single("imgFile"), createRestaurant);

export default router;
