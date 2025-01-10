import { Router } from "express";
import { jwtCheck, jwtParse } from "../middlewares/auth";
import { createCheckoutSession } from "../controllers/order.controller";

const router = Router();

router
  .route("/checkout/create-checkout-session")
  .post(jwtCheck, jwtParse, createCheckoutSession);

export default router;
