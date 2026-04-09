import catchAsync from "../../utils/catchAsync.js";
import sendResponse from "../../utils/sendResponse.js";
import { UserService } from "./user.service.js";
import pick from "../../utils/pick.js";
import { paginationFields } from "../../constants/pagination.js";

const getMyProfile = catchAsync(async (req, res) => {
    const userId = (req as any).user.id;
    const result = await UserService.getMyProfile(userId);

    sendResponse(res, {
        statusCode: 200,
        success: true,
        message: "Profile fetched successfully",
        data: result
    });
});

const updateMyProfile = catchAsync(async (req, res) => {
    const userId = (req as any).user.id;
    const payload = req.body;
    
    // Add image URL to payload if a file was uploaded
    if (req.file) {
        payload.image = (req.file as any).path;
    }
    
    const result = await UserService.updateMyProfile(userId, payload);

    sendResponse(res, {
        statusCode: 200,
        success: true,
        message: "Profile updated successfully",
        data: result
    });
});

const getAllUsers = catchAsync(async (req, res) => {
    const filters = pick(req.query, ["searchTerm", "role"]);
    const options = pick(req.query, paginationFields);

    const result = await UserService.getAllUsers(filters, options);
    sendResponse(res, {
        statusCode: 200,
        success: true,
        message: "All users fetched successfully",
        meta: result.meta,
        data: result.data
    });
});

const updateUser = catchAsync(async (req, res) => {
    const userId = req.params.id;
    const currentUser = (req as any).user;
    const result = await UserService.updateUser(currentUser, userId, req.body);

    sendResponse(res, {
        statusCode: 200,
        success: true,
        message: "User updated successfully",
        data: result
    });
});

const deleteUser = catchAsync(async (req, res) => {
    const userId = req.params.id;
    const force = req.query.force === 'true';
    const currentUser = (req as any).user;
    const result = await UserService.deleteUser(currentUser, userId, force);

    sendResponse(res, {
        statusCode: 200,
        success: true,
        message: "User deleted successfully",
        data: result
    });
});

export const UserController = {
    getMyProfile,
    updateMyProfile,
    getAllUsers,
    updateUser,
    deleteUser
}
