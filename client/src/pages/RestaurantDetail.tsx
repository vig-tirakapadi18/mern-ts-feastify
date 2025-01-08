import React, { FC } from "react";
import { useParams } from "react-router-dom";
import { useGetRestaurantById } from "../api/RestaurantApi";
import LoadingSpinner from "../components/LoadingSpinner";
import { AspectRatio } from "../components/ui/aspect-ratio";
import RestaurantInfo from "../components/RestaurantInfo";
import MenuItem from "../components/MenuItem";

const RestaurantDetail: FC = (): React.JSX.Element => {
  const { restaurantId } = useParams();
  const { restaurantData, isLoading } = useGetRestaurantById(restaurantId);

  if (isLoading || !restaurantData) return <LoadingSpinner />;

  return (
    <section className="flex flex-col gap-10">
      <AspectRatio ratio={16 / 5}>
        <img
          src={restaurantData.restaurant.imgUrl}
          className="rounded-md object-cover h-full w-full"
          alt={restaurantData.restaurant.restaurantName}
        />
      </AspectRatio>

      <div className="grid md:grid-cols-[4fr_2fr] gap-5 md:px-32">
        <div className="flex flex-col gap-4">
          <RestaurantInfo restaurant={restaurantData.restaurant} />
          <span className="text-2xl font-bold tracking-tight">Menu</span>

          {restaurantData.restaurant.menuItems.map((menuItem) => (
            <MenuItem key={crypto.randomUUID()} menuItem={menuItem} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default RestaurantDetail;
