import { betterAuth } from "better-auth";
import { prismaAdapter } from "better-auth/adapters/prisma";
import { emailOTP } from "better-auth/plugins";
import prisma from "./prisma";
import { sendPasswordResetOtpEmail } from "../app/utils/mailer";

console.log("[auth]: Initializing with baseURL:", process.env.BETTER_AUTH_URL);

export const auth = betterAuth({
    database: prismaAdapter(prisma, {
        provider: "postgresql",
    }),
    emailAndPassword: {
        enabled: true,
    },
    baseURL: process.env.BETTER_AUTH_URL,
    secret: process.env.BETTER_AUTH_SECRET,
    trustedOrigins: [
        process.env.CLIENT_URL || "http://localhost:3000",
        "http://localhost:3001",
        "http://localhost:3002"
    ],
    plugins: [
        emailOTP({
            async sendVerificationOTP({ email, otp, type }) {
                // type: "sign-in" | "email-verification" | "forget-password"
                if (type === "forget-password") {
                    await sendPasswordResetOtpEmail({ to: email, otp });
                    return;
                }

                // For now we only use OTP for password reset in this project.
                // You can extend this later for sign-in / email verification.
                await sendPasswordResetOtpEmail({ to: email, otp });
            },
        }),
    ],
    socialProviders: {
        google: {
            clientId: process.env.GOOGLE_CLIENT_ID as string,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
        },
        github: {
            clientId: process.env.GITHUB_CLIENT_ID as string,
            clientSecret: process.env.GITHUB_CLIENT_SECRET as string,
        },
    },
    user: {
        additionalFields: {
            role: {
                type: "string",
                defaultValue: "user",
            },
        },
    },
});
