import nodemailer from "nodemailer";

function getTransport() {
  const host = process.env.EMAIL_HOST;
  const user = process.env.EMAIL_USER;
  const pass = process.env.EMAIL_PASS;
  const port = Number(process.env.EMAIL_PORT || 587);

  console.log(`[mailer] Initializing transport: host=${host}, user=${user}, pass_length=${pass?.length || 0}`);

  if (!host || !user || !pass) {
    console.error("[mailer] Missing configuration. host/user/pass is required.");
    return null;
  }

  return nodemailer.createTransport({
    host: host, // "smtp.gmail.com"
    port: port, // 587
    secure: port === 465, // Use SSL/TLS for 465, STARTTLS for 587
    auth: { user, pass },
  });
}

export async function sendPasswordResetOtpEmail(params: { to: string; otp: string }) {
  const transport = getTransport();
  if (!transport) {
    // Fail silently in dev if email isn't configured
    return;
  }

  const from = process.env.EMAIL_FROM || process.env.EMAIL_USER!;

  console.log(`[mailer] Sending password reset OTP to: ${params.to}`);
  try {
    const info = await transport.sendMail({
      from,
      to: params.to,
      subject: "Your TasteNest password reset code",
      text: `Your password reset code is: ${params.otp}\n\nThis code will expire in 10 minutes.`,
    });
    console.log(`[mailer] Password reset OTP sent successfully: ${info.messageId} to ${params.to}`);
  } catch (err: any) {
    console.error(`[mailer] ERROR sending password reset OTP to ${params.to}:`, err.message);
  }
}

export async function sendEmailVerificationOtpEmail(params: { to: string; otp: string }) {
  const transport = getTransport();
  if (!transport) {
    console.warn("[mailer] Transport not configured. Skipping email.");
    return;
  }

  const from = process.env.EMAIL_FROM || process.env.EMAIL_USER!;
  console.log(`[mailer] Sending verification OTP to: ${params.to}`);

  try {
    const info = await transport.sendMail({
      from,
      to: params.to,
      subject: "Verify your TasteNest account",
      text: `Welcome to TasteNest! Your account verification code is: ${params.otp}\n\nPlease enter this code to complete your registration. This code will expire in 10 minutes.`,
    });
    console.log(`[mailer] Verification OTP sent successfully: ${info.messageId} to ${params.to}`);
  } catch (err: any) {
    console.error(`[mailer] ERROR sending verification OTP to ${params.to}:`, err.message);
  }
}

