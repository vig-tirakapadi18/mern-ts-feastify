import React, { FC } from "react";
import { useFieldArray, useFormContext } from "react-hook-form";
import { FormDescription, FormField, FormItem } from "../../ui/form";
import { Button } from "../../ui/button";
import MenuItemInput from "./MenuItemInput";
import { MdFastfood } from "react-icons/md";

const MenuSection: FC = (): React.JSX.Element => {
  const { control } = useFormContext();

  const { fields, append, remove } = useFieldArray({
    control,
    name: "menuItems",
  });

  return (
    <section className="space-y-2">
      <div className="">
        <h2 className="text-2xl font-bold">Menu</h2>
        <FormDescription>
          Create your men and give each item a name and a price.
        </FormDescription>

        <FormField
          control={control}
          name="menuItems"
          render={() => (
            <FormItem className="flex flex-col gap-2">
              {fields.map((_, idx) => (
                <MenuItemInput
                  key={crypto.randomUUID()}
                  index={idx}
                  removeMenuItem={() => remove(idx)}
                />
              ))}
            </FormItem>
          )}
        />

        <Button
          type="button"
          className="mt-3 bg-[dodgerblue] hover:bg-[dodgerblue] hover:opacity-95"
          onClick={() => append({ name: "", price: "" })}
        >
          <MdFastfood />
          Add Menu Item
        </Button>
      </div>
    </section>
  );
};

export default MenuSection;
