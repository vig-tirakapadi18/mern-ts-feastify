import { useAuth0 } from "@auth0/auth0-react";
import { useMutation } from "react-query";

interface ICreateUser {
  auth0Id: string;
  email: string;
}

const VITE_API_BASE_URL: string = import.meta.env.VITE_API_BASE_URL;

console.log(VITE_API_BASE_URL);

export const useCreateUser = () => {
  const { getAccessTokenSilently } = useAuth0();

  const createUserRequest = async (user: ICreateUser) => {
    const accessToken = await getAccessTokenSilently();
    console.log(accessToken);
    console.log(user);

    const response = await fetch(`${VITE_API_BASE_URL}/api/users`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(user),
    });

    console.log(response);

    if (!response.ok) throw new Error("Failed to create user!");
  };

  const {
    mutateAsync: createUser,
    isLoading,
    isError,
    isSuccess,
  } = useMutation(createUserRequest);

  return { createUser, isLoading, isError, isSuccess };
};
