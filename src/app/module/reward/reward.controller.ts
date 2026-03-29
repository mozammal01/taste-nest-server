import { Request, Response } from "express";
import { RewardService } from "./reward.service";
import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";

const getMyRewards = catchAsync(async (req: Request, res: Response) => {
    const user = (req as any).user;
    const result = await RewardService.getMyRewards(user.id);
    sendResponse(res, {
        statusCode: 200,
        success: true,
        message: "Rewards history fetched successfully",
        data: result
    });
});

export const RewardController = {
    getMyRewards
}
