import app from "../src/app";

export default async function handler(req: any, res: any) {
    try {
        return app(req, res);
    } catch (error: any) {
        console.error("VERCEL STARTUP CRASH:", error);
        res.status(500).json({
            success: false,
            message: "Server failed to start !!",
            error: error?.message || error,
            stack: error?.stack 
        });
    }
}
