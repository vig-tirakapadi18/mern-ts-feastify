import { useAuth0 } from "@auth0/auth0-react";
import { useMutation, useQuery } from "react-query";
import { toast } from "sonner";
import { IUser } from "../types";

interface ICreateUser {
  auth0Id: string;
  email: string;
}

interface IUpdateUser {
  name: string;
  addressLine1: string;
  city: string;
  country: string;
}

export const VITE_API_BASE_URL: string = import.meta.env.VITE_API_BASE_URL;

export const useCreateUser = () => {
  const { getAccessTokenSilently } = useAuth0();

  const createUserRequest = async (user: ICreateUser) => {
    const accessToken = await getAccessTokenSilently();

    const response = await fetch(`${VITE_API_BASE_URL}/api/users`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(user),
    });

    if (!response.ok) throw new Error("Failed to create user!");
  };

  const {
    mutateAsync: createUser,
    isLoading,
    isError,
    isSuccess,
  } = useMutation(createUserRequest);

  if (isSuccess) toast.success("User created successfully!");
  if (isError) toast.error("Failed to create user!");

  return { createUser, isLoading, isError, isSuccess };
};

export const useUpdateUser = () => {
  const { getAccessTokenSilently } = useAuth0();

  const updateUserRequest = async (formData: IUpdateUser) => {
    const accessToken = await getAccessTokenSilently();

    const response = await fetch(`${VITE_API_BASE_URL}/api/users/update-user`, {
      method: "PUT",
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    });

    if (!response.ok) throw new Error("Failed to update user!");
  };

  const {
    mutateAsync: updateUser,
    isLoading,
    isSuccess,
    isError,
    error,
    reset,
  } = useMutation(updateUserRequest);

  if (isSuccess) toast.success("User updated successfully!");
  if (isError || error) {
    toast.error("Failed to update user!");
    reset();
  }

  return { updateUser, isLoading, reset };
};

export const useGetLoggedInUser = () => {
  const { getAccessTokenSilently } = useAuth0();

  const getLoggedInUserRequest = async (): Promise<IUser> => {
    const accessToken = await getAccessTokenSilently();

    const response = await fetch(`${VITE_API_BASE_URL}/api/users`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) throw new Error("Failed to fetch user data!");

    return response.json();
  };

  const {
    data: currentLoggedInUser,
    isLoading,
    isError,
    error,
  } = useQuery("fetchLoggedInUser", getLoggedInUserRequest);

  if (isError || error) toast.error("Error fetching user!");

  return { currentLoggedInUser, isLoading };
};
