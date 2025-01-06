import React, { FC } from "react";
import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormMessage,
} from "../../ui/form";
import { Input } from "../../ui/input";
import { useFormContext } from "react-hook-form";
import { AspectRatio } from "../../ui/aspect-ratio";

const ImageSection: FC = (): React.JSX.Element => {
  const { control, watch } = useFormContext();

  const existingImgUrl = watch("imgUrl");

  return (
    <section>
      <div>
        <h2>Upload Image</h2>
        <FormDescription>
          Add an image that will be displayed on your restaurant listing in the
          search results. Adding a new image will overwrite the existing one.
        </FormDescription>
      </div>

      <div className="flex flex-col gap-8 md:w-[50%]">
        {existingImgUrl && (
          <AspectRatio ratio={16 / 9}>
            <img
              src={existingImgUrl}
              alt="restaurant food"
              className="rounded-md object-cover h-full w-full"
            />
          </AspectRatio>
        )}

        <FormField
          control={control}
          name="imgFile"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Input
                  className="bg-white"
                  type="file"
                  accept=".jpg, .jpeg, .png, .webp"
                  onChange={(event) =>
                    field.onChange(
                      event.target.files ? event.target.files[0] : null
                    )
                  }
                />
              </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />
      </div>
    </section>
  );
};

export default ImageSection;
