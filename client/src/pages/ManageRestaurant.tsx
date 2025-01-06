import React, { FC } from "react";
import ManageRestaurantForm from "../components/forms/Restaurant/ManageRestaurantForm";
import {
  useCreateRestaurant,
  useGetLoggedInUserRestaurant,
  useUpdateRestaurant,
} from "../api/RestaurantApi";

const ManageRestaurant: FC = (): React.JSX.Element => {
  const { createRestaurant, isLoading: isCreateLoading } =
    useCreateRestaurant();
  const { restaurant } = useGetLoggedInUserRestaurant();
  const { updateRestaurant, isLoading: isUpdateLoading } =
    useUpdateRestaurant();

  const isEditing = !!restaurant;

  return (
    <ManageRestaurantForm
      onSave={isEditing ? updateRestaurant : createRestaurant}
      isLoading={isCreateLoading || isUpdateLoading}
      restaurant={restaurant}
    />
  );
};

export default ManageRestaurant;
