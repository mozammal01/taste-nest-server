import { z } from "zod";

const createOrderValidationSchema = z.object({
  body: z.object({
    items: z.array(z.object({
        menuItemId: z.number(),
        quantity: z.number().min(1),
        price: z.number()
    })).min(1, "At least one item is required"),
    totalAmount: z.number({
      message: "Total amount is required",
    }),
    address: z.string({
        message: "Delivery address is required",
    }),
    phone: z.string({
        message: "Phone number is required",
    })
  }),
});

export const OrderValidations = {
  createOrderValidationSchema,
};
