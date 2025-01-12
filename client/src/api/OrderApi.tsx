import { useAuth0 } from "@auth0/auth0-react";
import { VITE_API_BASE_URL } from "./UserApi";
import { useMutation, useQuery } from "react-query";
import { toast } from "sonner";
import { IOrder } from "../types";

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

export const useCreateCheckoutSession = () => {
  const { getAccessTokenSilently } = useAuth0();

  const createCheckoutSessionRequest = async (
    checkoutSessionRequest: ICheckoutSessionRequest
  ) => {
    const accessToken = await getAccessTokenSilently();

    const response = await fetch(
      `${VITE_API_BASE_URL}/api/orders/checkout/create-checkout-session`,
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${accessToken}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(checkoutSessionRequest),
      }
    );

    if (!response.ok) throw new Error("Failed to create checkout session!");

    return response.json();
  };

  const {
    mutateAsync: createCheckoutSession,
    isLoading,
    error,
    isError,
    reset,
  } = useMutation(createCheckoutSessionRequest);

  if (error || isError) {
    toast.error("Error creating checkout session!");
    reset();
  }

  return { createCheckoutSession, isLoading };
};

export const useGetAllOrders = () => {
  const { getAccessTokenSilently } = useAuth0();

  const getAllOrdersRequest = async (): Promise<IOrder[]> => {
    const accessToken = await getAccessTokenSilently();

    const response = await fetch(`${VITE_API_BASE_URL}/api/orders`, {
      headers: { Authorization: `Bearer ${accessToken}` },
    });

    if (!response.ok) throw new Error("Unable to get orders!");

    return response.json();
  };

  const {
    data: getAllOrders,
    isError,
    error,
    isLoading,
  } = useQuery("getAllOrders", getAllOrdersRequest);

  if (isError || error) {
    toast.error("Failed to get orders!");
  }

  return { getAllOrders, isLoading };
};
