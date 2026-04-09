import { NextFunction, Request, Response } from "express";
import AppError from "../errorHelpers/AppError.js";
import catchAsync from "../utils/catchAsync.js";

const authMiddleware = (...requiredRoles: string[]) => {
    return catchAsync(async (req: Request, res: Response, next: NextFunction) => {
        try {
            // Lazy load auth to avoid ESM/CJS conflict
            const { auth: betterAuth } = await import("../../lib/auth.js");
            
            const session = await betterAuth.api.getSession({
                headers: new Headers(req.headers as any)
            });

            if (!session) {
                throw new AppError(401, "You are not authorized!");
            }

            const user = session.user;

            if (requiredRoles.length) {
                const hasRole = requiredRoles.includes((user as any).role);
                const isSuperAdmin = (user as any).role === "super_admin";
                const isAdminAllowed = requiredRoles.includes("admin") && isSuperAdmin;
                
                if (!hasRole && !isAdminAllowed) {
                    throw new AppError(403, "You have no permission to access this route!");
                }
            }

            (req as any).user = user;
            (req as any).session = session;
            next();
        } catch (error: any) {
            if (error instanceof AppError) throw error;
            throw new AppError(400, error.message || "Authentication failed");
        }
    });
};

export default authMiddleware;
