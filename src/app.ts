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

const limiter = rateLimit({
	windowMs: 15 * 60 * 1000, // 15 minutes
	limit: 1000, // Increased limit for development/heavy usage
	standardHeaders: 'draft-7', 
	legacyHeaders: false, 
    message: "Too many requests from this IP, please try again after 15 minutes"
});

app.use(helmet());
app.use(limiter);
app.use(
  cors({
    origin: [process.env.CLIENT_URL || "http://localhost:3000", "http://localhost:3001", "http://localhost:3002"],
    credentials: true,
  })
);
app.use(express.json());

// Better Auth Route with error logging
app.use("/api/auth", (req, res, next) => {
    toNodeHandler(auth)(req, res).catch((err) => {
        console.error("BETTER AUTH ERROR:", err);
        next(err);
    });
});

// Health Check
app.get('/', (req: Request, res: Response) => {
    res.json({
        message: 'Welcome to TasteNest API Service!',
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
