import { z } from "zod";

const addToCartValidationSchema = z.object({
  body: z.object({
    menuItemId: z.number({
        message: "Menu Item ID is required and must be a number",
    }),
    quantity: z.number().min(1, "Quantity must be at least 1").optional().default(1),
  }),
});

const updateCartQuantityValidationSchema = z.object({
  body: z.object({
    quantity: z.number().min(1, "Quantity must be at least 1"),
  }),
});

export const CartValidations = {
  addToCartValidationSchema,
  updateCartQuantityValidationSchema,
};
