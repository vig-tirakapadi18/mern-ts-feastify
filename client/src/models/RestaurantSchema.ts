import { z } from "zod";

export const formSchema = z
  .object({
    restaurantName: z.string({
      required_error: "Restaurant name is required!",
    }),
    city: z.string({
      required_error: "City is required!",
    }),
    country: z.string({
      required_error: "Country is required!",
    }),
    deliveryPrice: z.coerce.number({
      required_error: "Delivery price is required!",
      invalid_type_error: "Delivery price must be a valid number!",
    }),
    estimatedDeliveryTime: z.coerce.number({
      required_error: "Extimated delivery time is required!",
      invalid_type_error: "Estimated delivery time must be a valid number!",
    }),
    cuisines: z.array(z.string()).nonempty({
      message: "Please select atleast one item!",
    }),
    menuItems: z.array(
      z.object({
        name: z.string().min(1, "Name is required!"),
        price: z.coerce.number().min(1, "Price is required!"),
      })
    ),
    imgUrl: z.string().optional(),
    imgFile: z.instanceof(File, { message: "image is required" }).optional(),
  })
  .refine((data) => data.imgUrl || data.imgFile, {
    message: "Either image URL or image File must be provided",
    path: ["imageFile"],
  });
