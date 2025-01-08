import React, { FC } from "react";
import { IRestaurant } from "../types";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "./ui/card";
import { Dot } from "lucide-react";

interface IRestaurantInfoProps {
  restaurant: IRestaurant;
}

const RestaurantInfo: FC<IRestaurantInfoProps> = ({
  restaurant,
}): React.JSX.Element => {

  return (
    <Card className="border-sla">
      <CardHeader>
        <CardTitle className="text-3xl font-bold uppercase tracking-tight text-emerald-500">
          {restaurant.restaurantName}
        </CardTitle>

        <CardDescription>
          {restaurant.city}, {restaurant.country}
        </CardDescription>
      </CardHeader>

      <CardContent className="flex">
        {restaurant.cuisines &&
          restaurant.cuisines.map((cuisine, idx) => (
            <span className="flex" key={crypto.randomUUID()}>
              <span>{cuisine}</span>
              {idx < restaurant.cuisines.length - 1 && <Dot />}
            </span>
          ))}
      </CardContent>
    </Card>
  );
};

export default RestaurantInfo;
