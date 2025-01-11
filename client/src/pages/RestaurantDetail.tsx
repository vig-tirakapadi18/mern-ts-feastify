import React, { FC, useState } from "react";
import { useParams } from "react-router-dom";
import { useGetRestaurantById } from "../api/RestaurantApi";
import LoadingSpinner from "../components/LoadingSpinner";
import { AspectRatio } from "../components/ui/aspect-ratio";
import RestaurantInfo from "../components/RestaurantInfo";
import MenuItem from "../components/MenuItem";
import { ICartItem, IMenuItem } from "../types";
import { Card, CardFooter } from "../components/ui/card";
import OrderSummary from "../components/OrderSummary";
import CheckoutButton from "../components/CheckoutButton";
import { UserFormData } from "../components/forms/UserProfileForm";
import { useCreateCheckoutSession } from "../api/OrderApi";

const RestaurantDetail: FC = (): React.JSX.Element => {
  const { restaurantId } = useParams();

  const { restaurantData, isLoading } = useGetRestaurantById(restaurantId);
  const { createCheckoutSession, isLoading: isCheckoutLoading } =
    useCreateCheckoutSession();

  const [cartItems, setCartItems] = useState<ICartItem[]>(() => {
    const storedCartItems = sessionStorage.getItem(`cartItems-${restaurantId}`);

    return storedCartItems ? JSON.parse(storedCartItems) : [];
  });

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

      sessionStorage.setItem(
        `cartItems-${restaurantId}`,
        JSON.stringify(updatedCartItems)
      );

      return updatedCartItems;
    });
  };

  const removeFromCart = (cartItem: ICartItem) => {
    setCartItems((prevCartItems) => {
      const updatedCartItems = prevCartItems.filter(
        (item) => item._id !== cartItem._id
      );

      sessionStorage.setItem(
        `cartItems-${restaurantId}`,
        JSON.stringify(updatedCartItems)
      );

      return updatedCartItems;
    });
  };

  const onCheckout = async (userFormData: UserFormData) => {
    if (!restaurantData) return;

    const checkoutData = {
      cartItems: cartItems.map((cartItem) => ({
        menuItemId: cartItem._id,
        name: cartItem.name,
        quantity: cartItem.quantity,
      })),
      restaurantId: restaurantData?.restaurant._id,
      deliveryDetails: {
        name: userFormData.name,
        email: userFormData.email || "",
        addressLine1: userFormData.addressLine1,
        city: userFormData.city,
        country: userFormData.country,
      },
    };

    const data = await createCheckoutSession(checkoutData);
    window.location.href = data.url;
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
              removeFromCart={removeFromCart}
            />

            <CardFooter>
              <CheckoutButton
                disabled={cartItems.length === 0}
                onCheckout={onCheckout}
                isLoading={isCheckoutLoading}
              />
            </CardFooter>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default RestaurantDetail;
