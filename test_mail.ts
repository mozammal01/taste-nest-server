import nodemailer from "nodemailer";
import dotenv from "dotenv";
import path from "path";

// Load the .env from the server project
dotenv.config({ path: path.resolve("d:/Mozammal/Projects/tastenest-server/.env") });

async function testGmail() {
  const user = process.env.EMAIL_USER;
  const pass = process.env.EMAIL_PASS;

  console.log(`[test] Attempting to connect with: ${user}`);

  const transport = nodemailer.createTransport({
    service: "gmail",
    auth: { user, pass },
  });

  try {
    await transport.verify();
    console.log("[test] Success! Transport is verified and ready to send mail.");
    
    // Attempt sending a real test mail to the user's same account
    await transport.sendMail({
       from: user,
       to: user,
       subject: "TasteNest SMTP Test",
       text: "Congratulations! Your email system is now fully verified and working."
    });
    console.log("[test] Test mail sent successfully to:", user);
  } catch (err: any) {
    console.error("[test] Connection Failed:", err.message);
  }
}

testGmail();
