import React, { FC } from "react";
import ManageRestaurantForm from "../components/forms/Restaurant/ManageRestaurantForm";
import {
  useCreateRestaurant,
  useGetLoggedInUserRestaurant,
  useGetThisRestaurantOrders,
  useUpdateRestaurant,
} from "../api/RestaurantApi";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "../components/ui/tabs";
import OrderItemCard from "../components/OrderItemCard";
import LoadingSpinner from "../components/LoadingSpinner";

const ManageRestaurant: FC = (): React.JSX.Element => {
  const { createRestaurant, isLoading: isCreateLoading } =
    useCreateRestaurant();
  const { restaurant } = useGetLoggedInUserRestaurant();
  const { updateRestaurant, isLoading: isUpdateLoading } =
    useUpdateRestaurant();
  const { ordersResponse, isLoading: isOrdersLoading } =
    useGetThisRestaurantOrders();

  if (isOrdersLoading || !ordersResponse) return <LoadingSpinner />;

  const isEditing = !!restaurant;

  return (
    <Tabs defaultValue="orders">
      <TabsList>
        <TabsTrigger value="orders">Orders</TabsTrigger>
        <TabsTrigger value="manage-restaurant">Manage Restaurant</TabsTrigger>
      </TabsList>

      <TabsContent
        value="orders"
        className="space-y-5 bg-gray-50 p-10 rounded-lg"
      >
        <h2 className="text-2xl font-bold">
          {ordersResponse?.orders.length} active orders
        </h2>
        {ordersResponse?.orders.map((order) => (
          <OrderItemCard order={order} key={crypto.randomUUID()} />
        ))}
      </TabsContent>

      <TabsContent value="manage-restaurant">
        <ManageRestaurantForm
          onSave={isEditing ? updateRestaurant : createRestaurant}
          isLoading={isCreateLoading || isUpdateLoading}
          restaurant={restaurant}
        />
      </TabsContent>
    </Tabs>
  );
};

export default ManageRestaurant;
