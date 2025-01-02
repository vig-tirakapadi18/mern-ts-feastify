import { useMutation } from "react-query";

interface ICreateUser {
  auth0Id: string;
  email: string;
}

const VITE_API_BASE_URL: string = import.meta.env.VITE_API_BASE_URL;

export const useCreateUser = () => {
  const createUserRequest = async ({ auth0Id, email }: ICreateUser) => {
    const response = await fetch(`${VITE_API_BASE_URL}/api/users/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ auth0Id, email }),
    });

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
