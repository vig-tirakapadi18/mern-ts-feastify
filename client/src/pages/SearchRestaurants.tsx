import React, { FC } from "react";
import { useParams } from "react-router-dom";
import { useSearchRestaurants } from "../api/SearchApi";
import LoadingSpinner from "../components/LoadingSpinner";
import { HiOutlineEmojiSad } from "react-icons/hi";
import SearchResultInfo from "../components/SearchResultInfo";
import SearchResultCard from "../components/SearchResultCard";

const SearchRestaurants: FC = (): React.JSX.Element => {
  const { city } = useParams();
  const { restaurants, isLoading } = useSearchRestaurants(city);

  if (isLoading) return <LoadingSpinner />;

  if (!restaurants?.response.data || !city) {
    return (
      <div className="text-center flex justify-center items-center gap-2 text-3xl text-gray-500">
        <HiOutlineEmojiSad size={40} />
        No results found!
      </div>
    );
  }

  return (
    <section className="grid grid-cols-1 lg:grid-cols-[250px_1fr] gap-5">
      <div className="" id="cuisines-list">
        Insert Cuisines Here!
      </div>

      <div className="flex flex-col gap-5" id="main-content">
        <SearchResultInfo
          total={restaurants.response.pagination.totalRestaurants}
          city={city}
        />

        {restaurants.response.data.map((restaurant) => (
          <SearchResultCard key={crypto.randomUUID()} restaurant={restaurant} />
        ))}
      </div>
    </section>
    // <div>
    //   SearchRestaurants {city}
    //   {restaurants?.response.data.map((restaurant) => (
    //     <span key={crypto.randomUUID()}>{restaurant.city}</span>
    //   ))}
    // </div>
  );
};

export default SearchRestaurants;
