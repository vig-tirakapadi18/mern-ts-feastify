import { useQuery } from "react-query";
import { VITE_API_BASE_URL } from "./UserApi";
import { ISearchRestaurants } from "../types";

export const useSearchRestaurants = (city?: string) => {
  const createSearchRequest = async (): Promise<ISearchRestaurants> => {
    const response = await fetch(`${VITE_API_BASE_URL}/api/search/${city}`);

    if (!response.ok) {
      throw new Error("Failed to fetch restaurants!");
    }

    return response.json();
  };

  const { data: restaurants, isLoading } = useQuery(
    ["searchRestaurants"],
    createSearchRequest,
    { enabled: !!city }
  );

  return { restaurants, isLoading };
};
