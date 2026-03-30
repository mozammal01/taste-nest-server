import express, { Application, Request, Response } from 'express';
import cors from 'cors';
import router from './app/routes';
import globalErrorHandler from './app/middleware/globalErrorHandler';
import notFound from './app/middleware/notFound';
import helmet from 'helmet';
import { rateLimit } from 'express-rate-limit';

const app: Application = express();

app.set('trust proxy', 1);

// Diagnostic logging for Vercel cold starts
console.log("[server]: Initializing TasteNest Engine...");

const limiter = rateLimit({
	windowMs: 15 * 60 * 1000, // 15 minutes
	limit: 1000, 
	standardHeaders: 'draft-7', 
	legacyHeaders: false, 
    message: "Too many requests from this IP, please try again after 15 minutes"
});

app.use(helmet({
    contentSecurityPolicy: false,
    crossOriginResourcePolicy: { policy: "cross-origin" }
}));
app.use(limiter);
app.use(
  cors({
    origin: [
        "http://localhost:3000",
        "http://localhost:3001",
        "http://localhost:3002",
        "https://taste-nest-restaurent.vercel.app",
        process.env.CLIENT_URL as string
    ].filter(Boolean),
    credentials: true,
  })
);

// Better Auth Route (Dynamic import to avoid ERR_REQUIRE_ESM)
app.all("/api/auth/*", async (req, res, next) => {
    try {
        const { toNodeHandler } = await import("better-auth/node");
        const { auth } = await import("./lib/auth.js"); 
        return toNodeHandler(auth)(req, res);
    } catch (err) {
        console.error("BETTER AUTH DYNAMIC ERROR:", err);
        next(err);
    }
});

app.use(express.json());

// Health Check
app.get('/', (req: Request, res: Response) => {
    res.json({
        message: 'TasteNest API is active and running!',
        status: 'healthy',
        timestamp: new Date().toISOString()
    });
});

// API Routes
app.use('/api/v1', router);

// Error Middlewares
app.use(globalErrorHandler);
app.use(notFound);

export default app;
