import React, { FC } from "react";
import ManageRestaurantForm from "../components/forms/Restaurant/ManageRestaurantForm";
import {
  useCreateRestaurant,
  useGetLoggedInUserRestaurant,
} from "../api/RestaurantApi";

const ManageRestaurant: FC = (): React.JSX.Element => {
  const { createRestaurant, isLoading } = useCreateRestaurant();
  const { restaurant } = useGetLoggedInUserRestaurant();

  return (
    <ManageRestaurantForm onSave={createRestaurant} isLoading={isLoading} restaurant={restaurant} />
  );
};

export default ManageRestaurant;
