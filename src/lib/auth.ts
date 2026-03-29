import { betterAuth } from "better-auth";
import { prismaAdapter } from "better-auth/adapters/prisma";
import { emailOTP } from "better-auth/plugins";
import prisma from "./prisma";
import { sendPasswordResetOtpEmail, sendEmailVerificationOtpEmail } from "../app/utils/mailer";

console.log("[auth]: Initializing with baseURL:", process.env.BETTER_AUTH_URL);

export const auth = betterAuth({
    database: prismaAdapter(prisma, {
        provider: "postgresql",
    }),
    emailAndPassword: {
        enabled: true,
        requireEmailVerification: true,
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
                console.log(`[auth]: Triggering ${type} OTP for ${email}`);
                if (type === "email-verification" || type === "sign-in") {
                    await sendEmailVerificationOtpEmail({ to: email, otp });
                } else if (type === "forget-password") {
                    await sendPasswordResetOtpEmail({ to: email, otp });
                }
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
