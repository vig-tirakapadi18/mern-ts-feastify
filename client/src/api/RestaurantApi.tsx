import { useAuth0 } from "@auth0/auth0-react";
import { VITE_API_BASE_URL } from "./UserApi";
import { useMutation } from "react-query";
import { toast } from "sonner";
import { IRestaurant } from "../types";

export const useCreateRestaurant = () => {
  const { getAccessTokenSilently } = useAuth0();

  const createRestauantRequest = async (
    restaurantFormData: FormData
  ): Promise<IRestaurant> => {
    console.log("R DATA", JSON.stringify(restaurantFormData));
    const accessToken = await getAccessTokenSilently();

    const response = await fetch(`${VITE_API_BASE_URL}/api/restaurants`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
      body: restaurantFormData,
    });

    console.log(response);

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
