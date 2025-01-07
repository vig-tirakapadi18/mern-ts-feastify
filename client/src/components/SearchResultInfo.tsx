import React, { FC } from "react";
import { Link } from "react-router-dom";

interface ISearchResultInfo {
  total: number;
  city: string;
}

const SearchResultInfo: FC<ISearchResultInfo> = ({
  total,
  city,
}: ISearchResultInfo) => {
  return (
    <section className="text-xl font-bold flex flex-col gap-3 justify-between lg:items-center lg:flex-row">
      <span>
        {total} Restaurants found in {city}!{" "}
        <Link
          to="/"
          className="text-sm font-semibold cursor-pointer text-blue-500 underline"
        >
          Change Location
        </Link>
      </span>
      Insert sort dropdown here!
    </section>
  );
};

export default SearchResultInfo;
