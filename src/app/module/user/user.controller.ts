import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import { UserService } from "./user.service";
import pick from "../../utils/pick";
import { paginationFields } from "../../constants/pagination";

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

export const UserController = {
    getMyProfile,
    updateMyProfile,
    getAllUsers
}
