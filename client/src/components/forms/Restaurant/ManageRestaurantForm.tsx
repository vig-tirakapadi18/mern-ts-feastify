import { zodResolver } from "@hookform/resolvers/zod";
import React, { FC } from "react";
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

type restaurantFormData = z.infer<typeof formSchema>;

interface IManageRestaurantForm {
  onSave: (restaurantFormData: FormData) => void;
  isLoading: boolean;
}

const ManageRestaurantForm: FC = ({
  isLoading,
  onSave,
}: IManageRestaurantForm): React.JSX.Element => {
  const form = useForm<restaurantFormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      cuisines: [],
      menuItems: [{ name: "", price: 0 }],
    },
  });

  const onSubmit = (formDataJson: restaurantFormData) => {
    // TODO: converting formDataJson to a new FormData object
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
            Create Menu
          </Button>
        )}
      </form>
    </Form>
  );
};

export default ManageRestaurantForm;
