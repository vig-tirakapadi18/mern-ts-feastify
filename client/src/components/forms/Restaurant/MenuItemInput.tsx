import React, { FC } from "react";
import { useFormContext } from "react-hook-form";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../../ui/form";
import { Input } from "../../ui/input";
import { Button } from "../../ui/button";
import { FaTrashAlt } from "react-icons/fa";

interface IMenuItemInputProps {
  index: number;
  removeMenuItem: () => void;
}

const MenuItemInput: FC<IMenuItemInputProps> = ({
  index,
  removeMenuItem,
}: IMenuItemInputProps) => {
  const { control } = useFormContext();

  return (
    <section className="flex flex-row items-end gap-2 mt-4">
      <FormField
        control={control}
        name={`menuItems.${index}.name`}
        render={({ field }) => (
          <FormItem>
            <FormLabel className="flex items-center gap-1">
              Name <FormMessage />
            </FormLabel>

            <FormControl>
              <Input
                {...field}
                placeholder="Paneer Butter Pizza"
                className="bg-white"
              />
            </FormControl>
          </FormItem>
        )}
      />

      <FormField
        control={control}
        name={`menuItems.${index}.price`}
        render={({ field }) => (
          <FormItem>
            <FormLabel className="flex items-center gap-1">
              Price (Rs) <FormMessage />
            </FormLabel>

            <FormControl>
              <Input {...field} placeholder="250" className="bg-white" />
            </FormControl>
          </FormItem>
        )}
      />

      <Button
        type="button"
        onClick={removeMenuItem}
        className="bg-rose-500 max-h-fit hover:bg-rose-500 hover:opacity-95"
      >
        <FaTrashAlt />
      </Button>
    </section>
  );
};

export default MenuItemInput;
