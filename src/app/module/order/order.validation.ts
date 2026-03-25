import { z } from "zod";

const createOrderValidationSchema = z.object({
  body: z.object({
    menuItemId: z.number({
      required_error: "Menu Item ID is required",
    }),
    quantity: z.number({
      required_error: "Quantity is required",
    }).min(1, "Quantity must be at least 1"),
    totalPrice: z.number({
      required_error: "Total price is required",
    }),
  }),
});

export const OrderValidations = {
  createOrderValidationSchema,
};
