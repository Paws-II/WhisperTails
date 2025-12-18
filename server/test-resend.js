import { Resend } from "resend";
import dotenv from "dotenv";

dotenv.config();

const resend = new Resend(process.env.RESEND_API_KEY);

async function testEmail() {
  try {
    console.log(
      "Testing Resend with API key:",
      process.env.RESEND_API_KEY?.substring(0, 10) + "..."
    );

    const data = await resend.emails.send({
      from: "WhisperTails <onboarding@resend.dev>",
      to: "pamels0025@gmail.com", // Your test email
      subject: "Test Email from WhisperTails",
      html: "<h1>Hello!</h1><p>This is a test email.</p>",
    });

    console.log("✅ Success! Response:", data);
  } catch (error) {
    console.error("❌ Error:", error);
  }
}

testEmail();
