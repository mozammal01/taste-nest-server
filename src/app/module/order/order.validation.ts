import { z } from "zod";

const createOrderValidationSchema = z.object({
  body: z.object({
    menuItemId: z.number({
      message: "Menu Item ID is required",
    }),
    quantity: z.number({
      message: "Quantity is required",
    }).min(1, "Quantity must be at least 1"),
    totalPrice: z.number({
      message: "Total price is required",
    }),
  }),
});

export const OrderValidations = {
  createOrderValidationSchema,
};
