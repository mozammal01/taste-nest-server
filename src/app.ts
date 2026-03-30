import express, { Application, Request, Response } from 'express';
import cors from 'cors';
import { toNodeHandler } from "better-auth/node";
import { auth } from "./lib/auth";
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
	limit: 1000, // Increased limit for development/heavy usage
	standardHeaders: 'draft-7', 
	legacyHeaders: false, 
    message: "Too many requests from this IP, please try again after 15 minutes"
});

app.use(helmet({
    contentSecurityPolicy: false, // Relax for cross-origin if needed
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
// Better Auth Route (Registered BEFORE JSON parser to avoid issues with body parsing in social/POST requests)
app.all("/api/auth/*", (req, res, next) => {
    console.log(`[auth]: Incoming request ${req.method} ${req.url}`);
    toNodeHandler(auth)(req, res).catch((err) => {
        console.error("BETTER AUTH ERROR:", err);
        next(err);
    });
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
