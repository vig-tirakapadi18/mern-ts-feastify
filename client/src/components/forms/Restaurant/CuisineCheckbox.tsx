import React, { FC } from "react";
import { ControllerRenderProps, FieldValues } from "react-hook-form";
import { FormControl, FormItem, FormLabel } from "../../ui/form";
import { Checkbox } from "../../ui/checkbox";

interface ICuisineCheckboxProps {
  cuisine: string;
  field: ControllerRenderProps<FieldValues, "cuisines">;
}

const CuisineCheckbox: FC<ICuisineCheckboxProps> = ({
  cuisine,
  field,
}: ICuisineCheckboxProps): React.JSX.Element => {
  return (
    <FormItem className="flex flex-row items-center space-x-1 space-y-1 my-2 mt-2">
      <FormControl>
        <Checkbox
          className="bg-white"
          checked={field.value.includes(cuisine)}
          onCheckedChange={(checked) => {
            if (checked) {
              field.onChange([...field.value, cuisine]);
            } else {
              field.onChange(field.value.filter((c: string) => c !== cuisine));
            }
          }}
        />
      </FormControl>
      <FormLabel className="text-sm font-normal">{cuisine}</FormLabel>
    </FormItem>
  );
};

export default CuisineCheckbox;
