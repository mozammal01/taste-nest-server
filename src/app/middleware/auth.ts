import { NextFunction, Request, Response } from "express";
import { auth as betterAuth } from "../../lib/auth";
import AppError from "../errorHelpers/AppError";
import catchAsync from "../utils/catchAsync";

const auth = (...requiredRoles: string[]) => {
    return catchAsync(async (req: Request, res: Response, next: NextFunction) => {
        const session = await betterAuth.api.getSession({
            headers: new Headers(req.headers as any)
        });

        if (!session) {
            throw new AppError(401, "You are not authorized!");
        }

        const user = session.user;

        if (requiredRoles.length && !requiredRoles.includes((user as any).role)) {
            throw new AppError(403, "You have no permission to access this route!");
        }

        (req as any).user = user;
        (req as any).session = session;
        next();
    });
};

export default auth;
