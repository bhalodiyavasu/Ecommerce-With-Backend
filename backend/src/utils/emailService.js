const { Resend } = require("resend");
const { buildWelcomeHtml } = require("../templates/welcomeTemplate");

const resend = new Resend(process.env.RESEND_API_KEY);

const sendWelcomeEmail = async (toEmail, username) => {
  const { error } = await resend.emails.send({
    from: `Eternix <${process.env.RESEND_SENDER_EMAIL}>`,
    to: toEmail,
    subject: `Access your Eternix account, ${username}`,
    html: buildWelcomeHtml(username),
  });

  if (error) {
    throw new Error(error.message);
  }
};

module.exports = { sendWelcomeEmail };
