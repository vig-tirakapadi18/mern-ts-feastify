import React, { FC } from "react";
import { IOrder } from "../types";
import { Progress } from "./ui/progress";
import { ORDER_STATUS } from "../config/orderStatus";

interface IOrderStatusHeaderProps {
  order: IOrder;
}

const OrderStatusHeader: FC<IOrderStatusHeaderProps> = ({
  order,
}): React.JSX.Element => {
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

  const getOrderStatusInfo = () => {
    return (
      ORDER_STATUS.find((o) => o.value === order.status) || ORDER_STATUS[0]
    );
  };

  return (
    <>
      <h1 className="text-2xl font-bold tracking-tighter flex flex-col md:flex-row md:justify-between mb-2">
        <span className="font-light">
          Order Status:{" "}
          <span className="font-semibold text-emerald-500">
            {getOrderStatusInfo().label}
          </span>
        </span>
        <span className="font-light">
          Expected by:{" "}
          <span className="font-semibold text-emerald-500">
            {getExpectedDeliveryTime()}
          </span>
        </span>
      </h1>
      <Progress
        className="animate-pulse bg-emerald-300"
        value={getOrderStatusInfo().progressValue}
      />
    </>
  );
};

export default OrderStatusHeader;
