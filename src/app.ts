import express, { Application, Request, Response } from 'express';
import cors from 'cors';
import { toNodeHandler } from "better-auth/node";
import { auth } from "./lib/auth";
import menuRoutes from './routes/menu';
import cartRoutes from './routes/cart';
import orderRoutes from './routes/order';

const app: Application = express();

app.use(cors());
app.use(express.json());

// Auth Route
app.all("/api/auth/*", toNodeHandler(auth));

// Health Check
app.get('/', (req: Request, res: Response) => {
    res.json({
        message: 'Welcome to TasteNest API Service!',
        status: 'healthy',
        timestamp: new Date().toISOString()
    });
});

// Temporary Route Setup (Moving to modular aggregator in next steps)
app.use('/api/menu', menuRoutes);
app.use('/api/cart', cartRoutes);
app.use('/api/order', orderRoutes);

export default app;
