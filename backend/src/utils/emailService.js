const sendWelcomeEmail = async (toEmail, username) => {
  const response = await fetch("https://api.brevo.com/v3/smtp/email", {
    method: "POST",
    headers: {
      "api-key": process.env.BREVO_API_KEY,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      sender: { name: "Eternix Store", email: process.env.BREVO_SENDER_EMAIL },
      to: [{ email: toEmail, name: username }],
      subject: `Welcome to Eternix, ${username}!`,
      textContent: `Hi ${username}, welcome to Eternix! Your account has been created successfully. Visit us at ${process.env.FRONTEND_URL || "http://localhost:5173"}`,
      htmlContent: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; background-color: #ffffff;">
          <h2 style="color: #4F46E5;">Hi ${username}, welcome to Eternix!</h2>
          <p style="font-size: 15px; color: #374151; line-height: 1.6;">
            Your account has been created successfully. We are glad to have you with us.
          </p>
          <p style="font-size: 15px; color: #374151; line-height: 1.6;">
            You can now browse products, add to cart, and place orders.
          </p>
          <a href="${process.env.FRONTEND_URL || "http://localhost:5173"}"
             style="display: inline-block; background-color: #4F46E5; color: #ffffff;
                    padding: 12px 28px; text-decoration: none; border-radius: 6px;
                    font-size: 15px; margin-top: 12px;">
            Visit Store
          </a>
          <p style="font-size: 13px; color: #9CA3AF; margin-top: 28px; border-top: 1px solid #E5E7EB; padding-top: 16px;">
            You received this email because you signed up at Eternix.<br/>
            If this was not you, please ignore this email.
          </p>
        </div>
      `,
    }),
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message);
  }
};

module.exports = { sendWelcomeEmail };
