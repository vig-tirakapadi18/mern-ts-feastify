import React, { FC } from "react";
import { useGetAllOrders } from "../api/OrderApi";
import LoadingSpinner from "../components/LoadingSpinner";
import OrderStatusHeader from "../components/OrderStatusHeader";

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
          className="space-y-10 bg-gray-50 p-10 rounded-lg"
        >
          <OrderStatusHeader order={order} />
        </div>
      ))}
    </section>
  );
};

export default OrderStatus;
