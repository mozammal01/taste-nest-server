import { NextFunction, Request, Response } from "express";
import AppError from "../errorHelpers/AppError";
import catchAsync from "../utils/catchAsync";

const authMiddleware = (...requiredRoles: string[]) => {
    return catchAsync(async (req: Request, res: Response, next: NextFunction) => {
        try {
            // Lazy load auth to avoid ESM/CJS conflict
            const { auth: betterAuth } = await import("../../lib/auth.js");
            
            const session = await betterAuth.api.getSession({
                headers: new Headers(req.headers as any)
            });

            if (!session) {
                console.warn("[auth-middleware] No session found for headers:", req.headers.cookie);
                throw new AppError(401, "You are not authorized!");
            }

            const user = session.user;

            if (requiredRoles.length && !requiredRoles.includes((user as any).role)) {
                console.warn(`[auth-middleware] User ${user.email} with role ${(user as any).role} does not have required roles: ${requiredRoles.join(", ")}`);
                throw new AppError(403, "You have no permission to access this route!");
            }

            (req as any).user = user;
            (req as any).session = session;
            next();
        } catch (error: any) {
            console.error("[auth-middleware] unexpected error:", error);
            if (error instanceof AppError) throw error;
            throw new AppError(400, error.message || "Authentication failed");
        }
    });
};

export default authMiddleware;
