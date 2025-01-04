import React, { FC } from "react";
import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../../ui/form";
import { Input } from "../../ui/input";
import { useFormContext } from "react-hook-form";

const DetailsSection: FC = (): React.JSX.Element => {
  const { control } = useFormContext();

  return (
    <section className="space-y-2">
      <div className="">
        <h2 className="text-2xl font-bold">Details</h2>
        <FormDescription>
          Enter the details about your restaurant.
        </FormDescription>
      </div>
      <FormField
        control={control}
        name="restaurantName"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Name</FormLabel>
            <FormControl>
              <Input {...field} className="bg-white" />
            </FormControl>

            <FormMessage />
          </FormItem>
        )}
      />

      <div className="flex gap-4">
        <FormField
          control={control}
          name="city"
          render={({ field }) => (
            <FormItem className="flex-1">
              <FormLabel>City</FormLabel>
              <FormControl>
                <Input {...field} className="bg-white" />
              </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={control}
          name="country"
          render={({ field }) => (
            <FormItem className="flex-1">
              <FormLabel>Country</FormLabel>
              <FormControl>
                <Input {...field} className="bg-white" />
              </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />
      </div>

      <FormField
        control={control}
        name="deliveryPrice"
        render={({ field }) => (
          <FormItem className="max-w-[25%]">
            <FormLabel>Delivery Price (Rs)</FormLabel>
            <FormControl>
              <Input {...field} className="bg-white" placeholder="1.50" />
            </FormControl>

            <FormMessage />
          </FormItem>
        )}
      />

      <FormField
        control={control}
        name="estimatedDeliveryTime"
        render={({ field }) => (
          <FormItem className="max-w-[25%]">
            <FormLabel>Estimated Delivery Time (minutes)</FormLabel>
            <FormControl>
              <Input {...field} className="bg-white" placeholder="30" />
            </FormControl>

            <FormMessage />
          </FormItem>
        )}
      />
    </section>
  );
};

export default DetailsSection;
