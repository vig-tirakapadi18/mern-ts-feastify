import { Request, Response } from "express";
import Stripe from "stripe";
import {
  errorMessages,
  statusCodes,
  successMessages,
} from "../utils/constants";
import Restaurant, { MenuItemType } from "../models/restaurant.model";
import Order from "../models/order.model";

const STRIPE = new Stripe(process.env.STRIPE_API_KEY as string);
const FRONTEND_URL = process.env.FRONTEND_URL as string;
const STRIPE_WEBHOOK_SECRET = process.env.STRIPE_WEBHOOK_SECRET as string;

interface ICheckoutSessionRequest {
  cartItems: {
    menuItemId: string;
    name: string;
    quantity: number;
  }[];
  deliveryDetails: {
    email: string;
    name: string;
    addressLine1: string;
    city: string;
  };
  restaurantId: string;
}

export const createCheckoutSession = async (
  req: Request<{}, {}, ICheckoutSessionRequest>,
  res: Response
) => {
  try {
    const checkoutSessionRequest = req.body;

    const restaurant = await Restaurant.findById(
      checkoutSessionRequest.restaurantId
    );

    if (!restaurant) {
      res
        .status(statusCodes.code404)
        .json({ success: false, message: errorMessages.restaurantNotFound });
      return;
    }

    const newOrder = new Order({
      restaurant: restaurant,
      user: req.userId,
      status: "placed",
      deliveryDetails: checkoutSessionRequest.deliveryDetails,
      cartItems: checkoutSessionRequest.cartItems,
      createdAt: new Date(),
    });

    const lineItems = createLineItems(
      checkoutSessionRequest,
      restaurant.menuItems
    );

    const session = await createSession(
      lineItems,
      newOrder._id.toString(),
      restaurant.deliveryPrice,
      restaurant._id.toString()
    );

    if (!session.url) {
      res
        .status(statusCodes.code500)
        .json({ success: false, message: errorMessages.stripeSession });
    }

    await newOrder.save();
    res.status(statusCodes.code200).json({
      success: true,
      url: session.url,
      message: successMessages.sessionCreate,
    });
  } catch (error: any) {
    console.log("CHECKOUT SESSION ERROR", error);
    res
      .status(statusCodes.code500)
      .json({ success: false, message: error.raw.message });
  }
};

const createLineItems = (
  checkoutSessionRequest: ICheckoutSessionRequest,
  menuItems: MenuItemType[]
) => {
  const lineItems = checkoutSessionRequest.cartItems.map((item) => {
    const menuItem = menuItems.find(
      (currItem) => currItem._id.toString() === item.menuItemId.toString()
    );

    if (!menuItem) throw new Error("Menu item not found: " + item.menuItemId);

    const line_item: Stripe.Checkout.SessionCreateParams.LineItem = {
      price_data: {
        currency: "inr",
        unit_amount: menuItem.price,
        product_data: {
          name: menuItem.name,
        },
      },
      quantity: item.quantity,
    };
    return line_item;
  });

  return lineItems;
};

const createSession = async (
  lineItems: Stripe.Checkout.SessionCreateParams.LineItem[],
  orderId: string,
  deliveryPrice: number,
  restaurantId: string
) => {
  const sessionData = await STRIPE.checkout.sessions.create({
    line_items: lineItems,
    shipping_options: [
      {
        shipping_rate_data: {
          display_name: "Delivery",
          type: "fixed_amount",
          fixed_amount: {
            currency: "inr",
            amount: deliveryPrice,
          },
        },
      },
    ],
    mode: "payment",
    metadata: {
      orderId,
      restaurantId,
    },
    success_url: `${FRONTEND_URL}/order-status?success=true`,
    cancel_url: `${FRONTEND_URL}/detail/${restaurantId}?cancelled=true`,
  });

  return sessionData;
};

export const stripeWebhookHandler = async (req: Request, res: Response) => {
  let event;
  try {
    const sign = req.headers["stripe-signature"];
    event = STRIPE.webhooks.constructEvent(
      req.body,
      sign as string,
      STRIPE_WEBHOOK_SECRET
    );
  } catch (error: any) {
    console.log("STRIPE WEBHOOK", error);
    res
      .status(statusCodes.code400)
      .json({ error: `Webhook error ${error.message}` });
  }

  if (event?.type === "checkout.session.completed") {
    const order = await Order.findById(event.data.object.metadata?.orderId);

    if (!order) {
      res
        .status(statusCodes.code404)
        .json({ message: errorMessages.orderNotFound });
      return;
    }

    order.totalAmount = event.data.object.amount_total;
    order.status = "paid";

    await order.save();
  }

  res.status(statusCodes.code200).send();
};

export const getAllOrders = async (req: Request, res: Response) => {
  try {
    const orders = await Order.find({ user: req.userId })
      .populate("restaurant")
      .populate("user");

    if (!orders) {
      res
        .status(statusCodes.code404)
        .json({ message: errorMessages.orderNotFound });
      return;
    }

    res.status(statusCodes.code200).json({
      success: true,
      orders,
      message: successMessages.ordersFetch,
    });
  } catch (error) {
    console.log("GET ALL ORDERS", error);
    res
      .status(statusCodes.code500)
      .json({ message: errorMessages.ordersForUserNotFound });
  }
};
