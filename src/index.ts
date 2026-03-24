import express, { Request, Response } from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import menuRoutes from './routes/menu';
import cartRoutes from './routes/cart';
import orderRoutes from './routes/order';

import { toNodeHandler } from "better-auth/node";
import { auth } from "./lib/auth";

dotenv.config();

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// Auth Route
app.all("/api/auth/*", toNodeHandler(auth));

// Routes
app.use('/api/menu', menuRoutes);
app.use('/api/cart', cartRoutes);
app.use('/api/order', orderRoutes);



app.get('/', (req: Request, res: Response) => {
  res.json({
    message: 'Welcome to TasteNest API Service!',
    status: 'healthy',
    timestamp: new Date().toISOString()
  });
});

app.listen(port, () => {
  console.log(`[server]: Server is running at http://localhost:${port}`);
});
