import app from "../dist/app.js";

export default async function handler(req: any, res: any) {
    try {
        return app(req, res);
    } catch (error: any) {
        console.error("VERCEL STARTUP CRASH:", error);
        res.status(500).json({
            success: false,
            message: "Critical Error: Server failed to start !!",
            error: error?.message || error
        });
    }
}
