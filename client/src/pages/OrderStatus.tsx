import React, { FC } from "react";
import { useGetAllOrders } from "../api/OrderApi";
import LoadingSpinner from "../components/LoadingSpinner";
import OrderStatusHeader from "../components/OrderStatusHeader";
import OrderStatusDetail from "../components/OrderStatusDetail";
import { AspectRatio } from "../components/ui/aspect-ratio";

const OrderStatus: FC = (): React.JSX.Element => {
  const { orderResponse, isLoading } = useGetAllOrders();

  if (isLoading) return <LoadingSpinner />;

  if (!orderResponse?.orders || orderResponse.orders.length === 0)
    return <p>No orders found!</p>;

  return (
    <section className="space-y-10">
      {orderResponse.orders.map((order) => (
        <div
          key={crypto.randomUUID()}
          className="space-y-10 bg-gray-50 px-10 py-10 rounded-lg shadow-lg border-emerald-200 border-[0.5px]"
        >
          <OrderStatusHeader order={order} />

          <div className="grid gap-10 md:grid-cols-2">
            <OrderStatusDetail order={order} />
            <AspectRatio ratio={16 / 5}>
              <img
                src={order.restaurant.imgUrl}
                alt={order.restaurant.restaurantName}
                className="rounded-md object-cover h-full w-full"
              />
            </AspectRatio>
          </div>
        </div>
      ))}
    </section>
  );
};

export default OrderStatus;
