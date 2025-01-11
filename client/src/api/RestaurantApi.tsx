import { useAuth0 } from "@auth0/auth0-react";
import { VITE_API_BASE_URL } from "./UserApi";
import { useMutation, useQuery } from "react-query";
import { toast } from "sonner";
import { IRestaurantResponse } from "../types";

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
