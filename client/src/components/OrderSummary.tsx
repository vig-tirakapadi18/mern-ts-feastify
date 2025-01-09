import React, { FC } from "react";
import { ICartItem, IRestaurant } from "../types";
import { CardContent, CardHeader, CardTitle } from "./ui/card";
import { Badge } from "./ui/badge";
import { Separator } from "./ui/separator";
import { FaTrashAlt } from "react-icons/fa";

interface IOrderSummaryProps {
  restaurant: IRestaurant;
  cartItems: ICartItem[];
  removeFromCart: (cartItem: ICartItem) => void;
}

const OrderSummary: FC<IOrderSummaryProps> = ({
  restaurant,
  cartItems,
  removeFromCart,
}): React.JSX.Element => {
  const gettotalCost = () => {
    const totalInPaisas = cartItems.reduce(
      (total, item) => total + item.price * item.quantity,
      0
    );

    const totalDelivery = totalInPaisas + restaurant.deliveryPrice;

    return (totalDelivery / 100).toFixed(2);
  };

  return (
    <>
      <CardHeader>
        <CardTitle className="text-2xl font-bold tracking-tight flex justify-between">
          <span>Your Order</span>
          <span>Rs {gettotalCost()}</span>
        </CardTitle>
      </CardHeader>

      <CardContent className="flex flex-col gap-5">
        {cartItems.map((item) => (
          <div className="flex justify-between" key={crypto.randomUUID()}>
            <span>
              <Badge variant="outline" className="mr-2">
                {item.quantity}
              </Badge>
              {item.name}
            </span>

            <span className="flex items-center gap-1">
              <span>Rs {((item.price * item.quantity) / 100).toFixed(2)}</span>
              <FaTrashAlt
                className="text-rose-500 ml-1 cursor-pointer"
                size={18}
                onClick={() => removeFromCart(item)}
              />
            </span>
          </div>
        ))}

        <Separator />

        <section className="flex justify-between">
          <span>Delivery</span>
          <span>Rs {(restaurant.deliveryPrice / 100).toFixed(2)}</span>
        </section>

        <Separator />
      </CardContent>
    </>
  );
};

export default OrderSummary;
