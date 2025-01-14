import React, { FC, useEffect, useState } from "react";
import { IOrder, OrderStatus } from "../types";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Separator } from "./ui/separator";
import { Badge } from "./ui/badge";
import { Label } from "./ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import { ORDER_STATUS } from "../config/orderStatus";
import { useUpdateRestaurantOrderStatus } from "../api/RestaurantApi";

interface IOrderItemCardProps {
  order: IOrder;
}

const OrderItemCard: FC<IOrderItemCardProps> = ({
  order,
}): React.JSX.Element => {
  const { updateRestaurantStatusData, isLoading } =
    useUpdateRestaurantOrderStatus();

  const [status, setStatus] = useState<OrderStatus>(order.status);

  useEffect(() => {
    setStatus(order.status);
  }, [order.status]);

  const handleStatusChange = async (newStatus: OrderStatus) => {
    await updateRestaurantStatusData({
      orderId: order._id as string,
      status: newStatus,
    });

    setStatus(newStatus);
  };

  const getTime = () => {
    const orderDateTime = new Date(order.createdAt);

    const hours = orderDateTime.getHours();
    const mins = orderDateTime.getMinutes();

    const paddedHours = hours < 10 ? `0${hours}` : hours;
    const paddedMins = mins < 10 ? `0${mins}` : mins;

    return `${paddedHours}:${paddedMins}`;
  };
  return (
    <Card>
      <CardHeader>
        <CardTitle className="grid md:grid-cols-4 gap-4 justify-between mb-3">
          <div className="">
            <span>Customer Name</span>
            <span className="ml-2 font-normal">
              {order.deliveryDetails.name}
            </span>
          </div>

          <div className="">
            <span>Delivery Address:</span>
            <span className="ml-2 font-normal">
              {order.deliveryDetails.addressLine1}, {order.deliveryDetails.city}
            </span>
          </div>

          <div className="">
            <span>Time:</span>
            <span className="ml-2 font-normal">{getTime()}</span>
          </div>

          <div className="">
            <span>Total Cost:</span>
            <span className="ml-2 font-normal">
              Rs {(order.totalAmount / 100).toFixed(2)}
            </span>
          </div>
        </CardTitle>

        <Separator />
      </CardHeader>

      <CardContent className="flex flex-col gap-6">
        <div className="flex flex-col gap-2">
          {order.cartItems.map((item) => (
            <span key={crypto.randomUUID()}>
              <Badge variant="outline" className="mr-2">
                {item.quantity}
              </Badge>
              {item.name}
            </span>
          ))}
        </div>

        <div className="flex flex-col space-y-1.5">
          <Label htmlFor="status">What is the status of this order?</Label>

          <Select
            value={status}
            disabled={isLoading}
            onValueChange={(value) => handleStatusChange(value as OrderStatus)}
          >
            <SelectTrigger id="status">
              <SelectValue placeholder="Status" />

              <SelectContent position="popper">
                {ORDER_STATUS.map((status) => (
                  <SelectItem key={crypto.randomUUID()} value={status.value}>
                    {status.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </SelectTrigger>
          </Select>
        </div>
      </CardContent>
    </Card>
  );
};

export default OrderItemCard;
