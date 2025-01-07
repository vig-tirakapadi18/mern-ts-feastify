import { useQuery } from "react-query";
import { VITE_API_BASE_URL } from "./UserApi";
import { ISearchRestaurants } from "../types";
import { ISearchState } from "../pages/SearchRestaurants";

export const useSearchRestaurants = (
  searchState: ISearchState,
  city?: string
) => {
  const createSearchRequest = async (): Promise<ISearchRestaurants> => {
    const params = new URLSearchParams();
    params.set("searchQuery", searchState.searchQuery);
    params.set("page", searchState.page.toString());
    params.set("selectedCuisines", searchState.selectedCuisines.join(","));
    params.set("searchOption", searchState.sortOption);

    const response = await fetch(
      `${VITE_API_BASE_URL}/api/search/${city}?${params.toString()}`
    );

    if (!response.ok) {
      throw new Error("Failed to fetch restaurants!");
    }

    return response.json();
  };

  const { data: restaurants, isLoading } = useQuery(
    ["searchRestaurants", searchState],
    createSearchRequest,
    { enabled: !!city }
  );

  return { restaurants, isLoading };
};
