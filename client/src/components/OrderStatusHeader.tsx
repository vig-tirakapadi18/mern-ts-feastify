import React, { FC } from "react";
import { IOrder } from "../types";
import { Progress } from "./ui/progress";

interface IOrderStatusHeaderProps {
  order: IOrder;
}

const OrderStatusHeader: FC<IOrderStatusHeaderProps> = ({ order }) => {
  const getExpectedDeliveryTime = () => {
    const created = new Date(order.createdAt);

    created.setMinutes(
      created.getMinutes() + order.restaurant.estimatedDeliveryTime
    );

    const hours = created.getHours();
    const mins = created.getMinutes();

    const paddedMins = mins < 10 ? `0${mins}` : mins;
    const paddedHours = hours < 10 ? `0${hours}` : hours;

    return `${paddedHours}:${paddedMins}`;
  };

  return (
    <>
      <h1 className="text-4xl font-bold tracking-tighter flex flex-col gap-5 md:flex-row md:justify-between">
        <span>Order Status: {order.status}</span>
        <span>Expected by: {getExpectedDeliveryTime()}</span>
      </h1>
      <Progress className="animate-pulse" />
    </>
  );
};

export default OrderStatusHeader;
