import catchAsync from "../../utils/catchAsync.js";
import sendResponse from "../../utils/sendResponse.js";
import { AdminService } from "./admin.service.js";

const getStats = catchAsync(async (req, res) => {
    const result = await AdminService.getStats();

    sendResponse(res, {
        statusCode: 200,
        success: true,
        message: "Admin dashboard stats fetched successfully",
        data: result
    });
});

export const AdminController = {
    getStats
}
