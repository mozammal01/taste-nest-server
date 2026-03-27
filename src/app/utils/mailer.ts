import nodemailer from "nodemailer";

function getTransport() {
  const host = process.env.EMAIL_HOST;
  const user = process.env.EMAIL_USER;
  const pass = process.env.EMAIL_PASS;
  const port = Number(process.env.EMAIL_PORT || 465);

  if (!host || !user || !pass) return null;

  return nodemailer.createTransport({
    host,
    port,
    secure: port === 465,
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

  await transport.sendMail({
    from,
    to: params.to,
    subject: "Your TasteNest password reset code",
    text: `Your password reset code is: ${params.otp}\n\nThis code will expire in 10 minutes.`,
  });
}

