import React, { FC } from "react";
import { IOrder } from "../types";
import { Separator } from "./ui/separator";

interface IOrderStatusDetailProps {
  order: IOrder;
}

const OrderStatusDetail: FC<IOrderStatusDetailProps> = ({
  order,
}): React.JSX.Element => {
  return (
    <section className="space-y-5">
      <div className="flex flex-col">
        <span className="font-bold">Delivering to:</span>
        <span>{order.deliveryDetails.name}</span>
        <span>{order.deliveryDetails.addressLine1}</span>
      </div>
      <div className="flex flex-col">
        <span className="font-bold">Your Order</span>
        <ul>
          {order.cartItems.map((item) => (
            <li key={crypto.randomUUID()}>
              {item.name} X {item.quantity}
            </li>
          ))}
        </ul>
      </div>
      <Separator />
      <div className="flex flex-col">
        <span className="font-bold">Total</span>
        <span>Rs {(order.totalAmount / 100).toFixed(2)}</span>
      </div>
    </section>
  );
};

export default OrderStatusDetail;
