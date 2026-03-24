import { Request, Response, NextFunction } from "express";
import { auth } from "../lib/auth";

export const getSession = async (req: Request) => {
    return await auth.api.getSession({
        headers: new Headers(req.headers as any)
    });
};

export const isAuthenticated = async (req: Request, res: Response, next: NextFunction) => {
    const session = await getSession(req);
    if (!session) {
        return res.status(401).json({ error: "Unauthorized" });
    }
    (req as any).session = session;
    next();
};

export const isAdmin = async (req: Request, res: Response, next: NextFunction) => {
    const session = await getSession(req);
    if (!session || (session.user as any).role !== "admin") {
        return res.status(403).json({ error: "Forbidden: Admin access required" });
    }
    (req as any).session = session;
    next();
};
