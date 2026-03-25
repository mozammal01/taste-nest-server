import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import { UserService } from "./user.service";

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
    const result = await UserService.updateMyProfile(userId, req.body);

    sendResponse(res, {
        statusCode: 200,
        success: true,
        message: "Profile updated successfully",
        data: result
    });
});

const getAllUsers = catchAsync(async (req, res) => {
    const result = await UserService.getAllUsers();
    sendResponse(res, {
        statusCode: 200,
        success: true,
        message: "All users fetched successfully",
        data: result
    });
});

export const UserController = {
    getMyProfile,
    updateMyProfile,
    getAllUsers
}
