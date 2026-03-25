import { z } from "zod";

const updateUserValidationSchema = z.object({
  body: z.object({
    name: z.string().optional(),
    image: z.string().optional(),
  }),
});

export const UserValidations = {
  updateUserValidationSchema,
};
