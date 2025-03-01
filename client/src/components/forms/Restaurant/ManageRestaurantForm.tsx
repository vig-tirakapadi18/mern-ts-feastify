import { zodResolver } from "@hookform/resolvers/zod";
import React, { FC, useEffect } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Form } from "../../ui/form";
import { formSchema } from "../../../models/RestaurantSchema";
import DetailsSection from "./DetailsSection";
import { Separator } from "../../ui/separator";
import CuisinesSection from "./CuisinesSection";
import MenuSection from "./MenuSection";
import ImageSection from "./ImageSection";
import LoadingButton from "../../LoadingButton";
import { Button } from "../../ui/button";
import { IRestaurantResponse } from "../../../types";

type RestaurantFormData = z.infer<typeof formSchema>;

interface IManageRestaurantFormProps {
  restaurant?: IRestaurantResponse;
  onSave: (RestaurantFormData: FormData) => void;
  isLoading: boolean;
}

const ManageRestaurantForm: FC<IManageRestaurantFormProps> = ({
  restaurant,
  isLoading,
  onSave,
}: IManageRestaurantFormProps): React.JSX.Element => {
  const form = useForm<RestaurantFormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      cuisines: [],
      menuItems: [{ name: "", price: 0 }],
    },
  });

  useEffect(() => {
    if (!restaurant) return;

    const deliveryPriceFormatted = parseInt(
      (restaurant.restaurant.deliveryPrice / 100).toFixed(2)
    );

    const menuItemsFormatted = restaurant.restaurant.menuItems.map((item) => ({
      ...item,
      price: parseInt((item.price / 100).toFixed(2)),
    }));

    const updatedRestaurant = {
      ...restaurant.restaurant,
      deliveryPrice: deliveryPriceFormatted,
      menuItems: menuItemsFormatted,
    };

    form.reset(updatedRestaurant);
  }, [restaurant, form]);

  const onSubmit = (formDataJson: RestaurantFormData) => {
    const formData = new FormData();

    formData.append("restaurantName", formDataJson.restaurantName);
    formData.append("city", formDataJson.city);
    formData.append("country", formDataJson.country);
    formData.append(
      "deliveryPrice",
      (formDataJson.deliveryPrice * 100).toString()
    );
    formData.append(
      "estimatedDeliveryTime",
      formDataJson.estimatedDeliveryTime.toString()
    );
    formDataJson.cuisines.forEach((cuisine, idx) => {
      formData.append(`cuisines[${idx}]`, cuisine);
    });
    formDataJson.menuItems.forEach((menuItem, idx) => {
      formData.append(`menuItems[${idx}][name]`, menuItem.name);
      formData.append(
        `menuItems[${idx}][price]`,
        (menuItem.price * 100).toString()
      );
    });

    if (formDataJson.imgFile) formData.append("imgFile", formDataJson.imgFile);

    onSave(formData);
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="space-y-8 bg-gray-50 p-10 rounded-lg"
      >
        <DetailsSection />
        <Separator />
        <CuisinesSection />
        <Separator />
        <MenuSection />
        <Separator />
        <ImageSection />

        {isLoading ? (
          <LoadingButton />
        ) : (
          <Button
            type="submit"
            className="bg-emerald-500 text-md hover:bg-emerald-500 hover:opacity-95"
          >
            {restaurant?.restaurant.restaurantName ? "Update" : "Create"} Menu
          </Button>
        )}
      </form>
    </Form>
  );
};

export default ManageRestaurantForm;
