import { z } from "zod";

export const formSchema = z.object({
  email: z.string().optional(),
  name: z.string().min(1, "Name is required!"),
  addressLine1: z.string().min(1, "Address line 1 is required!"),
  city: z.string().min(1, "City is required!"),
  country: z.string().min(1, "Country is required!"),
});