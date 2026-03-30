import { Request, Response } from "express";
import { FavoriteService } from "./favorite.service.js";
import catchAsync from "../../utils/catchAsync.js";
import sendResponse from "../../utils/sendResponse.js";

const toggleFavorite = catchAsync(async (req: Request, res: Response) => {
    const user = (req as any).user;
    const result = await FavoriteService.toggleFavorite(user.id, req.body.menuItemId);
    sendResponse(res, {
        statusCode: 200,
        success: true,
        message: "Favorite toggled successfully",
        data: result
    });
});

const getMyFavorites = catchAsync(async (req: Request, res: Response) => {
    const user = (req as any).user;
    const result = await FavoriteService.getMyFavorites(user.id);
    sendResponse(res, {
        statusCode: 200,
        success: true,
        message: "Favorites fetched successfully",
        data: result
    });
});

export const FavoriteController = {
    toggleFavorite,
    getMyFavorites
}
