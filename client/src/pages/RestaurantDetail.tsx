import React, { FC, useState } from "react";
import { useParams } from "react-router-dom";
import { useGetRestaurantById } from "../api/RestaurantApi";
import LoadingSpinner from "../components/LoadingSpinner";
import { AspectRatio } from "../components/ui/aspect-ratio";
import RestaurantInfo from "../components/RestaurantInfo";
import MenuItem from "../components/MenuItem";
import { ICartItem, IMenuItem } from "../types";
import { Card } from "../components/ui/card";
import OrderSummary from "../components/OrderSummary";

const RestaurantDetail: FC = (): React.JSX.Element => {
  const { restaurantId } = useParams();
  const { restaurantData, isLoading } = useGetRestaurantById(restaurantId);

  const [cartItems, setCartItems] = useState<ICartItem[]>([]);

  const addToCart = (menuItem: IMenuItem) => {
    setCartItems((prevCartItems) => {
      const existingCartItem = prevCartItems.find(
        (cartItem) => cartItem._id === menuItem._id
      );

      let updatedCartItems;

      if (existingCartItem) {
        updatedCartItems = prevCartItems.map((cartItem) =>
          cartItem._id === menuItem._id
            ? { ...cartItem, quantity: cartItem.quantity + 1 }
            : cartItem
        );
      } else {
        updatedCartItems = [
          ...prevCartItems,
          {
            _id: menuItem._id,
            name: menuItem.name,
            quantity: 1,
            price: menuItem.price,
          },
        ];
      }

      return updatedCartItems;
    });
  };

  if (isLoading || !restaurantData) return <LoadingSpinner />;

  return (
    <section className="flex flex-col gap-10">
      <AspectRatio ratio={16 / 5}>
        <img
          src={restaurantData.restaurant.imgUrl}
          className="rounded-md object-cover h-full w-full"
          alt={restaurantData.restaurant.restaurantName}
        />
      </AspectRatio>

      <div className="grid md:grid-cols-[4fr_2fr] gap-5 md:px-32">
        <div className="flex flex-col gap-4">
          <RestaurantInfo restaurant={restaurantData.restaurant} />
          <span className="text-2xl font-bold tracking-tight">Menu</span>

          {restaurantData.restaurant.menuItems.map((menuItem) => (
            <MenuItem
              key={crypto.randomUUID()}
              menuItem={menuItem}
              addToCart={() => addToCart(menuItem)}
            />
          ))}
        </div>

        <div className="">
          <Card>
            <OrderSummary
              restaurant={restaurantData.restaurant}
              cartItems={cartItems}
            />
          </Card>
        </div>
      </div>
    </section>
  );
};

export default RestaurantDetail;
