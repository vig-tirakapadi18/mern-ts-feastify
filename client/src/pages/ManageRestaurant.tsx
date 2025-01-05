import React, { FC } from "react";
import ManageRestaurantForm from "../components/forms/Restaurant/ManageRestaurantForm";
import { useCreateRestaurant } from "../api/RestaurantApi";

const ManageRestaurant: FC = (): React.JSX.Element => {
  const { createRestaurant, isLoading } = useCreateRestaurant();

  return (
    <ManageRestaurantForm onSave={createRestaurant} isLoading={isLoading} />
  );
};

export default ManageRestaurant;
