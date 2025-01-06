import React, { FC } from "react";
import { useParams } from "react-router-dom";
import { useSearchRestaurants } from "../api/SearchApi";

const SearchRestaurants: FC = (): React.JSX.Element => {
  const { city } = useParams();
  const { restaurants, isLoading } = useSearchRestaurants(city);

  return (
    <>
      {isLoading ? (
        <span>Loading...</span>
      ) : (
        <div>
          SearchRestaurants {city}
          {restaurants?.response.data.map((restaurant) => (
            <span key={crypto.randomUUID()}>{restaurant.city}</span>
          ))}
        </div>
      )}
    </>
  );
};

export default SearchRestaurants;
