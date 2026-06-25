const FRONTEND_URL = process.env.FRONTEND_URL || "http://localhost:5173";

const buildWelcomeHtml = (username) => {
  const cleanUsername = (username || "VASU").toUpperCase();
  return `
<!DOCTYPE html>
<html dir="ltr">
<head>
  <meta charset="utf-8">
  <meta http-equiv="x-ua-compatible" content="ie=edge">
  <title>WELCOME TO ETERNIX</title>
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap" rel="stylesheet">
  <style type="text/css">
    body, table, td, a {
      -ms-text-size-adjust: 100%;
      -webkit-text-size-adjust: 100%;
      font-family: 'Inter', system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, sans-serif;
    }
    table, td { mso-table-rspace: 0pt; mso-table-lspace: 0pt; vertical-align: top; }
    img { -ms-interpolation-mode: bicubic; max-width: 100%; height: auto; text-decoration: none; border: 0; outline: none; }
    table { border-collapse: collapse !important; }
    body { width: 100% !important; height: 100% !important; padding: 0 !important; margin: 0 !important; background-color: transparent; }
    
    /* Interactive hover state */
    .btn-shop:hover {
      background-color: #222222 !important;
      color: #ffffff !important;
    }
  </style>
</head>
<body dir="ltr" style="background-color: transparent; margin: 0; padding: 0; width: 100% !important;">

  <!-- Preheader -->
  <div style="display:none;max-width:0;max-height:0;overflow:hidden;font-size:1px;color:#fff;opacity:0;">
    WELCOME TO ETERNIX. DISCOVER A NEW PERSPECTIVE ON MODERN ESSENTIALS.
  </div>

  <table border="0" cellpadding="0" cellspacing="0" width="100%" style="background-color: transparent;">
    <tr>
      <td align="center" style="padding: 0;">
        <table border="0" cellpadding="0" cellspacing="0" width="100%" style="max-width: 600px; width: 100%; background-color: transparent;">
          
          <!-- TOP BRANDING -->
          <tr>
            <td align="left" style="padding: 40px 0px 16px 0px;">
              <div style="font-family: 'Inter', system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, sans-serif; font-size: 24px; font-weight: 800; color: #111111; text-transform: uppercase; letter-spacing: 0; margin: 0 0 4px 0;">
                ETERNIX
              </div>
              <div style="font-family: 'Inter', system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, sans-serif; font-size: 11px; font-weight: 600; color: #888888; text-transform: uppercase; letter-spacing: 1px; margin: 0;">
                DESIGNED TO TRANSCEND SEASONS
              </div>
            </td>
          </tr>

          <!-- HERO SECTION -->
          <tr>
            <td align="left" style="padding: 16px 0px 32px 0px;">
              <p style="font-family: 'Inter', system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, sans-serif; font-size: 13px; font-weight: 600; color: #555555; margin: 0 0 16px 0; letter-spacing: 0.5px;">
                HELLO ${cleanUsername},
              </p>
              
              <h1 style="font-family: 'Inter', system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, sans-serif; font-size: 28px; font-weight: 800; color: #111111; margin: 0 0 20px 0; letter-spacing: -0.5px; text-transform: uppercase;">
                WELCOME TO ETERNIX. A NEW ERA OF ELEVATED APPAREL.
              </h1>
              
              <p style="font-family: 'Inter', system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, sans-serif; font-size: 13px; color: #333333; margin: 0 0 16px 0; width: 100%; letter-spacing: 0.5px;">
                WE ARE EXCITED TO HAVE YOU WITH US. AS YOUR NEW DESTINATION FOR PREMIUM AND MODERN CLOTHING, OUR GOAL IS TO PROVIDE YOU WITH THE BEST SHOPPING EXPERIENCE AND HIGH-QUALITY APPAREL THAT FITS YOUR EVERYDAY STYLE.
              </p>
              
              <p style="font-family: 'Inter', system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, sans-serif; font-size: 13px; color: #333333; margin: 0 0 32px 0; width: 100%; letter-spacing: 0.5px;">
                YOUR ACCOUNT IS NOW READY, AND YOU CAN START EXPLORING OUR LATEST COLLECTIONS. FIND YOUR FAVORITE PIECES AND ENJOY UPDATES, NEW ARRIVALS, AND SPECIAL OFFERS.
              </p>
              
              <!-- Clean CTA Button -->
              <table role="presentation" border="0" cellpadding="0" cellspacing="0">
                <tr>
                  <td>
                    <a href="${FRONTEND_URL}"
                       target="_blank"
                       class="btn-shop"
                       style="font-family: 'Inter', system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, sans-serif; background-color: #000000; color: #ffffff; padding: 16px 36px; font-size: 12px; font-weight: 700; text-decoration: none; border-radius: 0; display: inline-block; letter-spacing: 2px; text-transform: uppercase; border: 1px solid #000000;">
                      EXPLORE THE COLLECTION
                    </a>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- CLOSING & SIGN OFF -->
          <tr>
            <td align="left" style="padding: 0px 0px 16px 0px;">
              <p style="font-family: 'Inter', system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, sans-serif; font-size: 13px; color: #666666; margin: 0 0 16px 0; letter-spacing: 0.5px;">
                IF YOU HAVE QUESTIONS OR REQUIRE ASSISTANCE, OUR GLOBAL CARE TEAM IS PREPARED TO RESPOND.
              </p>
              <p style="font-family: 'Inter', system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, sans-serif; font-size: 13px; font-weight: 600; color: #111111; margin: 0 0 4px 0; letter-spacing: 0.5px;">
                WARMLY,
              </p>
              <p style="font-family: 'Inter', system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, sans-serif; font-size: 13px; font-weight: 800; letter-spacing: 1px; text-transform: uppercase; color: #111111; margin: 0;">
                THE ETERNIX TEAM
              </p>
            </td>
          </tr>

          <!-- SOLID BLACK FOOTER (NO BORDER RADIUS) -->
          <tr>
            <td align="center" style="padding: 0;">
              <table border="0" cellpadding="0" cellspacing="0" width="100%" bgcolor="#000000" style="background-color: #000000; border-radius: 0;">
                <tr>
                  <td align="center" style="padding: 40px 24px 36px 24px;">
                    <!-- Brand wordmark -->
                    <div style="font-family: 'Inter', system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, sans-serif; font-size: 20px; font-weight: 800; color: #ffffff; text-transform: uppercase; margin-bottom: 16px; letter-spacing: 2px;">
                      ETERNIX
                    </div>
                    
                    <!-- Developed by section -->
                    <div style="font-family: 'Inter', system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, sans-serif; font-size: 13px; color: #888888; text-transform: uppercase; letter-spacing: 1px; margin-bottom: 20px;">
                      DEVELOPED BY <a href="https://github.com/bhalodiyavasu" target="_blank" style="color: #ffffff; text-decoration: underline; font-weight: 700; letter-spacing: 1px;">VASU BHALODIYA</a>
                    </div>

                    <!-- Sign up notice & Unsubscribe -->
                    <div style="font-family: 'Inter', system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, sans-serif; font-size: 11px; color: #888888; text-transform: uppercase; letter-spacing: 0.5px; margin-bottom: 10px;">
                      YOU'RE GETTING THIS BECAUSE YOU SIGNED UP AT <a href="http://eternix.vasubhalodiya.in/" target="_blank" style="color: #ffffff; text-decoration: underline;">ETERNIX</a>
                    </div>
                    <div style="font-family: 'Inter', system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, sans-serif; font-size: 11px; margin-bottom: 24px; text-transform: uppercase; letter-spacing: 1px;">
                      <a href="http://eternix.vasubhalodiya.in/unsubscribe" target="_blank" style="color: #cccccc; text-decoration: underline;">UNSUBSCRIBE</a>
                    </div>
                    
                    <!-- Copyright -->
                    <div style="font-family: 'Inter', system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, sans-serif; font-size: 10px; color: #666666; text-transform: uppercase; letter-spacing: 1px;">
                      © 2026 ETERNIX. ALL RIGHTS RESERVED.
                    </div>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

        </table>
      </td>
    </tr>
  </table>

</body>
</html>
`;
};

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
      textContent: `Hi ${username}, welcome to Eternix! Your account has been created successfully. Visit us at ${FRONTEND_URL}`,
      htmlContent: buildWelcomeHtml(username),
    }),
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message);
  }
};

module.exports = { sendWelcomeEmail, buildWelcomeHtml };
