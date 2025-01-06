import React, { FC } from "react";
import { IRestaurant } from "../types";
import { Link } from "react-router-dom";
import { AspectRatio } from "./ui/aspect-ratio";
import { Dot } from "lucide-react";
import { FaRegClock } from "react-icons/fa";
import { FaMoneyBill1Wave } from "react-icons/fa6";

interface ISearchResultCard {
  restaurant: IRestaurant;
}

const SearchResultCard: FC<ISearchResultCard> = ({
  restaurant,
}): React.JSX.Element => {
  return (
    <Link
      to={`/detail/${restaurant._id}`}
      className="grid lg:grid-cols-[2fr_3fr] gap-5 group"
    >
      <AspectRatio ratio={16 / 6}>
        <img
          src={restaurant.imgUrl}
          className="rounded-md w-full h-full object-cover"
          alt={restaurant.restaurantName}
        />
      </AspectRatio>

      <div className="grid md:grid-cols-2 gap-2" id="card-content">
        <div className="flex flex-row flex-wrap">
          {restaurant.cuisines.map((item, idx) => (
            <span key={crypto.randomUUID()}>
              <span>{item}</span>
              {idx < restaurant.cuisines.length - 1 && <Dot />}
            </span>
          ))}
        </div>

        <div className="flex gap-2 flex-col">
          <div className="flex items-center gap-1 text-green-600">
            <FaRegClock className="text-green-600" />
            {restaurant.estimatedDeliveryTime} mins
          </div>

          <div className="flex items-center gap-1">
            <FaMoneyBill1Wave />
          </div>
        </div>
      </div>
    </Link>
  );
};

export default SearchResultCard;
