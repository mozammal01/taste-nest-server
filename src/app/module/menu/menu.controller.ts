import { Request, Response } from "express";
import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import { MenuService } from "./menu.service";

import pick from "../../utils/pick";
import { paginationFields } from "../../constants/pagination";

const createMenuItem = catchAsync(async (req, res) => {
    const result = await MenuService.createMenuItem(req.body);
    sendResponse(res, {
        statusCode: 201,
        success: true,
        message: 'Menu item created successfully',
        data: result
    });
});

const getAllMenuItems = catchAsync(async (req, res) => {
    const filters = pick(req.query, ["searchTerm", "category", "freeDelivery"]);
    const options = pick(req.query, paginationFields);

    const result = await MenuService.getAllMenuItems(filters, options);
    sendResponse(res, {
        statusCode: 200,
        success: true,
        message: 'Menu items fetched successfully',
        meta: result.meta,
        data: result.data
    });
});

const getCategories = catchAsync(async (req, res) => {
    const result = await MenuService.getCategories();
    sendResponse(res, {
        statusCode: 200,
        success: true,
        message: 'Categories fetched successfully',
        data: result
    });
});

const getSingleMenuItem = catchAsync(async (req, res) => {
    const { id } = req.params;
    const result = await MenuService.getSingleMenuItem(parseInt(id));
    sendResponse(res, {
        statusCode: 200,
        success: true,
        message: 'Menu item fetched successfully',
        data: result
    });
});

const updateMenuItem = catchAsync(async (req, res) => {
    const { id } = req.params;
    const result = await MenuService.updateMenuItem(parseInt(id), req.body);
    sendResponse(res, {
        statusCode: 200,
        success: true,
        message: 'Menu item updated successfully',
        data: result
    });
});

const deleteMenuItem = catchAsync(async (req, res) => {
    const { id } = req.params;
    await MenuService.deleteMenuItem(parseInt(id));
    sendResponse(res, {
        statusCode: 200,
        success: true,
        message: 'Menu item deleted successfully'
    });
});

export const MenuController = {
    createMenuItem,
    getAllMenuItems,
    getCategories,
    getSingleMenuItem,
    updateMenuItem,
    deleteMenuItem
}
