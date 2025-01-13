import nodemailer from "nodemailer";

function checkRequiredEnvVars() {
  const requiredVars = ["EMAIL_USER", "EMAIL_PASS", "VALIDATED_SENDER_EMAIL"];
  const missingVars = requiredVars.filter((varName) => !process.env[varName]);

  if (missingVars.length > 0) {
    throw new Error(
      `Missing required environment variables: ${missingVars.join(", ")}`
    );
  }
}

export async function POST(req) {
  console.log("API route called");

  try {
    checkRequiredEnvVars();

    const requestBody = await req.json();
    console.log("Received data:", requestBody);

    const { email } = requestBody;

    const validatedSenderEmail = process.env.VALIDATED_SENDER_EMAIL;

    console.log(`Using validated sender email: ${validatedSenderEmail}`);

    const transporter = nodemailer.createTransport({
      host: "smtp-relay.brevo.com",
      port: 587,
      secure: false,
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    const mailOptions = {
      from: validatedSenderEmail,
      to: "infos.phareaway@gmail.com",
      subject: `Demande de vérification d'association`,
      text: `
        Email: ${email}
      `,
    };

    console.log("Attempting to send email");
    const info = await transporter.sendMail(mailOptions);
    console.log("Email sent successfully:", info.response);

    return new Response(
      JSON.stringify({
        message: "Mail envoyé avec succès !",
        info: info.response,
      }),
      {
        status: 200,
        headers: { "Content-Type": "application/json" },
      }
    );
  } catch (error) {
    console.error("Erreur lors de l'envoi de l'email:", error);
    return new Response(
      JSON.stringify({
        error: "Erreur lors de l'envoi de l'email.",
        details: error.message,
      }),
      {
        status: 500,
        headers: { "Content-Type": "application/json" },
      }
    );
  }
}
