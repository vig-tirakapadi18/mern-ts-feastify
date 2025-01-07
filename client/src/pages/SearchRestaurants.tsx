import React, { FC, useState } from "react";
import { useParams } from "react-router-dom";
import { useSearchRestaurants } from "../api/SearchApi";
import LoadingSpinner from "../components/LoadingSpinner";
import { HiOutlineEmojiSad } from "react-icons/hi";
import SearchResultInfo from "../components/SearchResultInfo";
import SearchResultCard from "../components/SearchResultCard";
import SearchBar, { SearchForm } from "../components/SearchBar";
import PaginationSelector from "../components/PaginationSelector";

export interface ISearchState {
  searchQuery: string;
  page: number;
}

const SearchRestaurants: FC = (): React.JSX.Element => {
  const { city } = useParams();

  const [searchState, setSearchState] = useState<ISearchState>({
    searchQuery: "",
    page: 1,
  });

  const { restaurants, isLoading } = useSearchRestaurants(searchState, city);

  if (isLoading) return <LoadingSpinner />;

  if (!restaurants?.response.data || !city) {
    return (
      <div className="text-center flex justify-center items-center gap-2 text-3xl text-gray-500">
        <HiOutlineEmojiSad size={40} />
        No results found!
      </div>
    );
  }

  const handleSearchQuery = (searchFormData: SearchForm) => {
    setSearchState((prevState) => ({
      ...prevState,
      searchQuery: searchFormData.searchQuery,
      page: 1,
    }));
  };

  const handleResetSearch = () => {
    setSearchState((prevState) => ({
      ...prevState,
      searchQuery: "",
      page: 1,
    }));
  };

  const handlePageSet = (page: number) => {
    setSearchState((prevState) => ({
      ...prevState,
      page,
    }));
  };

  return (
    <section className="grid grid-cols-1 lg:grid-cols-[250px_1fr] gap-5">
      <div className="" id="cuisines-list">
        Insert Cuisines Here!
      </div>

      <div className="flex flex-col gap-5" id="main-content">
        <SearchBar
          onSubmit={handleSearchQuery}
          placeHolder="Search by Cuisine or Restaurant Name"
          onReset={handleResetSearch}
          searchQuery={searchState.searchQuery}
        />

        <SearchResultInfo
          total={restaurants.response.pagination.totalRestaurants}
          city={city}
        />

        {restaurants.response.data.map((restaurant) => (
          <SearchResultCard key={crypto.randomUUID()} restaurant={restaurant} />
        ))}

        <PaginationSelector
          page={restaurants.response.pagination.page}
          pages={restaurants.response.pagination.pages}
          onPageChange={handlePageSet}
        />
      </div>
    </section>
  );
};

export default SearchRestaurants;
