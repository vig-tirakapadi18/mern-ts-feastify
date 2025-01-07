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
      className="grid lg:grid-cols-[2fr_3fr] gap-5 group bg-black bg-opacity-10 px-4 py-8 rounded-lg shadow-md"
    >
      <AspectRatio ratio={16 / 6}>
        <img
          src={restaurant.imgUrl}
          className="rounded-md w-full h-full object-cover"
          alt={restaurant.restaurantName}
        />
      </AspectRatio>
      <div className="">
        <h3 className="text-2xl font-bold tracking-tight mb-2 group-hover:underline text-emerald-500">
          {restaurant.restaurantName}
        </h3>

        <div className="grid md:grid-cols-2 gap-2" id="card-content">
          <div className="flex flex-row flex-wrap">
            {restaurant.cuisines.map((item, idx) => (
              <span key={crypto.randomUUID()} className="flex">
                <span>{item}</span>
                {idx < restaurant.cuisines.length - 1 && <Dot />}
              </span>
            ))}
          </div>

          <div className="flex gap-2 flex-col">
            <div className="flex items-center gap-1 text-green-600">
              <FaRegClock className="text-green-600" size={20} />
              {restaurant.estimatedDeliveryTime} mins
            </div>

            <div className="flex items-center gap-1 text-rose-500">
              <FaMoneyBill1Wave size={24} />
              Delivery from Rs {(restaurant.deliveryPrice / 100).toFixed(2)}
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default SearchResultCard;
