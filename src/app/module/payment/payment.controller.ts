import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import { PaymentService } from "./payment.service";

const createPaymentIntent = catchAsync(async (req, res) => {
    const { amount } = req.body;
    const result = await PaymentService.createPaymentIntent(amount);

    sendResponse(res, {
        statusCode: 200,
        success: true,
        message: "Payment intent created successfully",
        data: result
    });
});

const getMyPayments = catchAsync(async (req, res) => {
  const user = (req as any).user;
  const result = await PaymentService.getMyPayments(user.id);
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "Payment history fetched successfully",
    data: result,
  });
});

export const PaymentController = {
    createPaymentIntent,
    getMyPayments,
}
