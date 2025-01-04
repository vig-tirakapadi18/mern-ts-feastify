import React, { FC } from "react";
import { useFormContext } from "react-hook-form";
import {
  FormDescription,
  FormField,
  FormItem,
  FormMessage,
} from "../../ui/form";
import { cuisineList } from "../../../config/restaurantOptions";
import CuisineCheckbox from "./CuisineCheckbox";

const CuisinesSection: FC = (): React.JSX.Element => {
  const { control } = useFormContext();

  return (
    <section className="space-y-2">
      <div className="">
        <h2 className="text-2xl font-bold">Cuisines</h2>
        <FormDescription>
          Select the cuisines that your restaurant serves.
        </FormDescription>
      </div>

      <FormField
        control={control}
        name="cuisines"
        render={({ field }) => (
          <FormItem>
            <div className="grid md:grid-cols-5 gap-1">
              {cuisineList.map((cuisine) => (
                <CuisineCheckbox
                  key={cuisine}
                  cuisine={cuisine}
                  field={field}
                />
              ))}
            </div>

            <FormMessage />
          </FormItem>
        )}
      ></FormField>
    </section>
  );
};

export default CuisinesSection;
