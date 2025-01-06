import { z } from "zod";

export const searchSchema = z.object({
  searchQuery: z.string({
    required_error: "Restaurant name is required!",
  }),
});
