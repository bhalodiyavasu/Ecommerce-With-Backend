const { buildWelcomeHtml } = require("../templates/welcomeTemplate");

// Subject ma name lagadvu ho to normal rakhvu puncutations vagar
const sendWelcomeEmail = async (toEmail, username) => {
  const subjectText = `Access your Eternix account, ${username}`;

  const response = await fetch("https://api.brevo.com/v3/smtp/email", {
    method: "POST",
    headers: {
      "api-key": process.env.BREVO_API_KEY,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      sender: { name: "Eternix", email: process.env.BREVO_SENDER_EMAIL },
      to: [{ email: toEmail, name: username }],
      subject: subjectText,
      htmlContent: buildWelcomeHtml(username),
    }),
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message);
  }
};

module.exports = { sendWelcomeEmail };