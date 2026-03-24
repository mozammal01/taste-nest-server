import { Request, Response } from "express";
import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import { CartService } from "./cart.service";

const addToCart = catchAsync(async (req, res) => {
    const userId = (req as any).session.user.id;
    const result = await CartService.addToCart(userId, {
        menuItemId: parseInt(req.body.menuItemId),
        quantity: req.body.quantity
    });
    
    sendResponse(res, {
        statusCode: 201,
        success: true,
        message: 'Item added to cart successfully',
        data: result
    });
});

const getMyCart = catchAsync(async (req, res) => {
    const userId = (req as any).session.user.id;
    const result = await CartService.getMyCart(userId);
    
    sendResponse(res, {
        statusCode: 200,
        success: true,
        message: 'Cart items fetched successfully',
        data: result
    });
});

const updateCartItemQuantity = catchAsync(async (req, res) => {
    const userId = (req as any).session.user.id;
    const { id } = req.params;
    const result = await CartService.updateCartItemQuantity(userId, parseInt(id), req.body.quantity);
    
    sendResponse(res, {
        statusCode: 200,
        success: true,
        message: 'Cart item updated successfully',
        data: result
    });
});

const removeCartItem = catchAsync(async (req, res) => {
    const userId = (req as any).session.user.id;
    const { id } = req.params;
    await CartService.removeCartItem(userId, parseInt(id));
    
    sendResponse(res, {
        statusCode: 200,
        success: true,
        message: 'Item removed from cart successfully'
    });
});

const clearCart = catchAsync(async (req, res) => {
    const userId = (req as any).session.user.id;
    await CartService.clearCart(userId);
    
    sendResponse(res, {
        statusCode: 200,
        success: true,
        message: 'Cart cleared successfully'
    });
});

export const CartController = {
    addToCart,
    getMyCart,
    updateCartItemQuantity,
    removeCartItem,
    clearCart
}
