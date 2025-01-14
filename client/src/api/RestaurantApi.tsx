import { useAuth0 } from "@auth0/auth0-react";
import { VITE_API_BASE_URL } from "./UserApi";
import { useMutation, useQuery } from "react-query";
import { toast } from "sonner";
import { IOrderResponse, IRestaurantResponse } from "../types";

interface IStatusUpdateData {
  orderId: string;
  status: string;
}

export const useCreateRestaurant = () => {
  const { getAccessTokenSilently } = useAuth0();

  const createRestauantRequest = async (
    restaurantFormData: FormData
  ): Promise<IRestaurantResponse> => {
    const accessToken = await getAccessTokenSilently();

    const response = await fetch(`${VITE_API_BASE_URL}/api/restaurants`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
      body: restaurantFormData,
    });

    if (!response.ok) throw new Error("Error creating a restaurant!");

    return response.json();
  };

  const {
    mutateAsync: createRestaurant,
    isLoading,
    isSuccess,
    isError,
  } = useMutation(createRestauantRequest);

  if (isSuccess) toast.success("Restaurant created successfully!");
  if (isError) toast.error("Error creating a restaurant!");

  return { createRestaurant, isLoading };
};

export const useGetLoggedInUserRestaurant = () => {
  const { getAccessTokenSilently } = useAuth0();

  const getRestauranRequest = async (): Promise<IRestaurantResponse> => {
    const accessToken = await getAccessTokenSilently();

    const response = await fetch(`${VITE_API_BASE_URL}/api/restaurants`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });

    if (!response.ok) throw new Error("Error fetching restaurant!");

    return response.json();
  };

  const { data: restaurant, isLoading } = useQuery(
    "getRestaurant",
    getRestauranRequest
  );

  return { restaurant, isLoading };
};

export const useUpdateRestaurant = () => {
  const { getAccessTokenSilently } = useAuth0();

  const updateRestaurantRequest = async (
    restaurantFormData: FormData
  ): Promise<IRestaurantResponse> => {
    const accessToken = await getAccessTokenSilently();

    const response = await fetch(
      `${VITE_API_BASE_URL}/api/restaurants/update-restaurant`,
      {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
        body: restaurantFormData,
      }
    );

    if (!response.ok) throw new Error("Error updating the restaurant!");

    return response.json();
  };

  const {
    mutate: updateRestaurant,
    isError,
    isSuccess,
    isLoading,
    error,
  } = useMutation(updateRestaurantRequest);

  if (isSuccess) toast.success("Successfully updated the restaurant!");

  if (isError || error) toast.error("Failed to update the restaurant!");

  return { updateRestaurant, isLoading };
};

export const useGetRestaurantById = (restaurantId?: string) => {
  const getMyRestaurantRequest = async (): Promise<IRestaurantResponse> => {
    const response = await fetch(
      `${VITE_API_BASE_URL}/api/restaurants/${restaurantId}`
    );

    return response.json();
  };

  const {
    data: restaurantData,
    isError,
    isLoading,
  } = useQuery("getRestaurantById", getMyRestaurantRequest, {
    enabled: !!restaurantId, // ONLY ENABLES QUERY IF restaurantId IS PRESENT
  });

  if (isError) toast.error("Failed to get the restaurant!");

  return { restaurantData, isLoading };
};

export const useGetThisRestaurantOrders = () => {
  const { getAccessTokenSilently } = useAuth0();

  const getThisrestaurantOrdersRequest = async (): Promise<IOrderResponse> => {
    const accessToken = await getAccessTokenSilently();

    const response = await fetch(`${VITE_API_BASE_URL}/api/restaurants/order`, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json",
      },
    });

    if (!response.ok)
      throw new Error("Failed to get this restaurant's orders!");

    return response.json();
  };

  const {
    data: ordersResponse,
    isError,
    error,
    isLoading,
  } = useQuery(["getThisrestaurantOrders"], getThisrestaurantOrdersRequest);

  if (isError || error)
    toast.error("Failed to fetch orders for this restaurant!");

  return { ordersResponse, isLoading };
};

export const useUpdateRestaurantOrderStatus = () => {
  const { getAccessTokenSilently } = useAuth0();

  const updateRestaurantStatusRequest = async (
    statusUpdateData: IStatusUpdateData
  ) => {
    const accessToken = await getAccessTokenSilently();

    const response = await fetch(
      `${VITE_API_BASE_URL}/api/restaurants/order/${statusUpdateData.orderId}/status`,
      {
        method: "PATCH",
        headers: {
          Authorization: `Bearer ${accessToken}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ status: statusUpdateData.status }),
      }
    );

    if (!response.ok) throw new Error("Failed to update order status!");

    return response.json();
  };

  const {
    mutateAsync: updatedRestaurantStatusData,
    isLoading,
    isError,
    isSuccess,
    reset,
  } = useMutation(updateRestaurantStatusRequest);

  if (isSuccess) toast.success("Order status updated successfully!");
  if (isError) {
    toast.error("Failed to pdate he order status!");
    reset();
  }

  return { updatedRestaurantStatusData, isLoading };
};
