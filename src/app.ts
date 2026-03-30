import express, { Application, Request, Response } from 'express';
import cors from 'cors';
import router from './app/routes/index.js';
import globalErrorHandler from './app/middleware/globalErrorHandler.js';
import notFound from './app/middleware/notFound.js';
import helmet from 'helmet';
import { rateLimit } from 'express-rate-limit';
import { toNodeHandler } from "better-auth/node";
import { auth } from "./lib/auth.js";

const app: Application = express();

app.set('trust proxy', 1);

// Diagnostic logging for Vercel cold starts
console.log("[server]: Initializing TasteNest Engine (ESM Mode)...");

const limiter = rateLimit({
	windowMs: 15 * 60 * 1000, 
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
        "https://taste-next-restaurant.vercel.app", // Correct spelling & domain
        "https://taste-nest-restaurent.vercel.app", // Original misspelled one
        process.env.CLIENT_URL as string
    ].filter(Boolean),
    credentials: true,
  })
);

// Better Auth Route (Standard import now that we have ESM enabled)
app.all("/api/auth/*", (req, res, next) => {
    return toNodeHandler(auth)(req, res);
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
