import dotenv from 'dotenv';
dotenv.config();

import { Server } from 'http';
import app from './app';

const port = process.env.PORT || 5000;

async function bootstrap() {
    const server: Server = app.listen(port, () => {
        console.log(`[server]: Server is running at http://localhost:${port}`);
    });

    const exitHandler = () => {
        if (server) {
            server.close(() => {
                console.info("Server closed");
                process.exit(1);
            });
        }
        process.exit(1);
    };

    const unexpectedErrorHandler = (error: unknown) => {
        console.error(error);
        exitHandler();
    };

    process.on("uncaughtException", unexpectedErrorHandler);
    process.on("unhandledRejection", unexpectedErrorHandler);

    process.on("SIGTERM", () => {
        console.info("SIGTERM received");
        if (server) {
            server.close();
        }
    });
}

bootstrap().catch(err => console.log(err));
