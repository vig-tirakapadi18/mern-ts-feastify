import { Router } from "express";
import { jwtCheck, jwtParse } from "../middlewares/auth";
import { createCheckoutSession, stripeWebhookHandler } from "../controllers/order.controller";

const router = Router();

router
  .route("/checkout/create-checkout-session")
  .post(jwtCheck, jwtParse, createCheckoutSession);

router.route("/checkout/webhook").post(stripeWebhookHandler);

export default router;
