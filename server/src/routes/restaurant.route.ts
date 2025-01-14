import { Router } from "express";
import {
  createRestaurant,
  getLoggedInUserRestaurant,
  getRestaurantById,
  getThisRestaurantOrders,
  updateOrderStatus,
  updateRestaurant,
} from "../controllers/restaurant.controller";
import { upload } from "../config/multer";
import { jwtCheck, jwtParse } from "../middlewares/auth";
import {
  validateParam,
  validateRestaurantRequest,
} from "../middlewares/validation";

const router = Router();

router.route("/order").get(jwtCheck, jwtParse, getThisRestaurantOrders);

router
  .route("/order/:orderId/status")
  .patch(jwtCheck, jwtParse, updateOrderStatus);

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

router
  .route("/:restaurantId")
  .get(validateParam("restaurantId"), getRestaurantById);

export default router;
