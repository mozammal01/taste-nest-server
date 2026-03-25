import { z } from "zod";

const createMenuItemValidationSchema = z.object({
  body: z.object({
    name: z.string({
      required_error: "Name is required",
    }),
    content: z.string().optional(),
    category: z.string({
      required_error: "Category is required",
    }),
    price: z.number({
      required_error: "Price is required",
    }),
    image: z.string().optional(),
    discount: z.string().optional(),
    freeDelivery: z.boolean().optional().default(false),
  }),
});

const updateMenuItemValidationSchema = z.object({
  body: z.object({
    name: z.string().optional(),
    content: z.string().optional(),
    category: z.string().optional(),
    price: z.number().optional(),
    image: z.string().optional(),
    discount: z.string().optional(),
    freeDelivery: z.boolean().optional(),
  }),
});

export const MenuValidations = {
  createMenuItemValidationSchema,
  updateMenuItemValidationSchema,
};
