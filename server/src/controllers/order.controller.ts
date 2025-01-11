import { Request, Response } from "express";
import Stripe from "stripe";
import {
  CODE_200,
  CODE_404,
  CODE_500,
  ERROR_RESTAURANT_NOT_FOUND,
  ERROR_STRIPE_SESSION,
  SESSION_CREATE_SUCCESS,
} from "../utils/constants";
import Restaurant, { MenuItemType } from "../models/restaurant.model";

const STRIPE = new Stripe(process.env.STRIPE_API_KEY as string);
const FRONTEND_URL = process.env.FRONTEND_URL as string;

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
        .status(CODE_404)
        .json({ success: false, message: ERROR_RESTAURANT_NOT_FOUND });
      return;
    }

    const lineItems = createLineItems(
      checkoutSessionRequest,
      restaurant.menuItems
    );

    const session = await createSession(
      lineItems,
      "TEST_ORDER_ID",
      restaurant.deliveryPrice,
      restaurant._id.toString()
    );

    if (!session.url) {
      res
        .status(CODE_500)
        .json({ success: false, message: ERROR_STRIPE_SESSION });
    }

    res.status(CODE_200).json({
      success: true,
      url: session.url,
      message: SESSION_CREATE_SUCCESS,
    });
  } catch (error: any) {
    console.log("CHECKOUT SESSION ERROR", error);
    res.status(CODE_500).json({ success: false, message: error.raw.message });
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
