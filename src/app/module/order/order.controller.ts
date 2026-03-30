import catchAsync from "../../utils/catchAsync.js";
import sendResponse from "../../utils/sendResponse.js";
import { OrderService } from "./order.service.js";

const createOrder = catchAsync(async (req, res) => {
    const userId = (req as any).session.user.id;
    const result = await OrderService.createOrder(userId, req.body);
    
    sendResponse(res, {
        statusCode: 201,
        success: true,
        message: 'Order placed successfully',
        data: result
    });
});

const getMyOrders = catchAsync(async (req, res) => {
    const userId = (req as any).session.user.id;
    const result = await OrderService.getMyOrders(userId);
    
    sendResponse(res, {
        statusCode: 200,
        success: true,
        message: 'Your orders fetched successfully',
        data: result
    });
});

const getAllOrders = catchAsync(async (req, res) => {
    const result = await OrderService.getAllOrders();
    
    sendResponse(res, {
        statusCode: 200,
        success: true,
        message: 'All orders fetched successfully (Admin)',
        data: result
    });
});

const updateOrderStatus = catchAsync(async (req, res) => {
    const { id } = req.params;
    const { status } = req.body;
    const result = await OrderService.updateOrderStatus(parseInt(id), status);
    
    sendResponse(res, {
        statusCode: 200,
        success: true,
        message: 'Order status updated successfully',
        data: result
    });
});

export const OrderController = {
    createOrder,
    getMyOrders,
    getAllOrders,
    updateOrderStatus
}
