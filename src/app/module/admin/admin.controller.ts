import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import { AdminService } from "./admin.service";

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
