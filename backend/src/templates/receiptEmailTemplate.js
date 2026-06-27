const FRONTEND_URL = process.env.FRONTEND_URL || "http://localhost:5173";

const buildReceiptHtml = (order) => {
  const { contactInfo, orderNumber, paymentId, stripeSessionId, createdAt } = order;

  const displayOrderNumber = (orderNumber || order._id || "").toUpperCase();
  const orderDate = new Date(createdAt).toLocaleDateString("en-GB", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
  const downloadUrl = `${FRONTEND_URL}/download-receipt?session_id=${stripeSessionId}`;

  return `<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>ORDER CONFIRMED — ${displayOrderNumber}</title>
</head>
<body style="margin: 0; padding: 0; background-color: #ffffff; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; -webkit-text-size-adjust: 100%;">

  <div style="max-width: 600px; margin: 0 auto; padding: 40px 20px; background-color: #ffffff;">

    <!-- BRAND HEADER -->
    <div style="padding-bottom: 24px; border-bottom: 2px solid #ebebeb;">
      <div style="font-size: 24px; font-weight: 800; color: #111111; text-transform: uppercase; letter-spacing: 0px;">ETERNIX</div>
      <div style="font-size: 10px; font-weight: 500; color: #777777; text-transform: uppercase; letter-spacing: 1px;">DESIGNED TO TRANSCEND SEASONS</div>
    </div>

    <!-- GREETING -->
    <div style="padding: 28px 0 24px 0;">
      <p style="font-size: 12px; font-weight: 700; color: #555555; margin: 0 0 12px 0; letter-spacing: 0.5px; text-transform: uppercase;">
        HELLO ${(contactInfo?.fullName || "CUSTOMER").toUpperCase()},
      </p>
      <h1 style="font-size: 22px; font-weight: 800; color: #111111; margin: 0 0 8px 0; letter-spacing: -0.5px; text-transform: uppercase; line-height: 1.2;">
        YOUR ORDER IS CONFIRMED.
      </h1>
      <p style="font-size: 11px; color: #888888; margin: 0; line-height: 1.6; letter-spacing: 0.5px; text-transform: uppercase;">
        ${orderDate}
      </p>
    </div>

    <!-- DIVIDER -->
    <div style="height: 1px; background-color: #ebebeb; margin-bottom: 28px;"></div>

    <!-- CUSTOMER DETAILS -->
    <div style="margin-bottom: 28px;">
      <div style="font-size: 10px; font-weight: 700; color: #aaaaaa; text-transform: uppercase; letter-spacing: 1.5px; margin-bottom: 14px;">CUSTOMER DETAILS</div>

      <table width="100%" cellpadding="0" cellspacing="0" border="0" style="border-collapse: collapse;">
        <tr>
          <td style="padding: 5px 0; font-size: 13px; font-weight: 700; color: #888888; text-transform: uppercase; letter-spacing: 0.5px; width: 140px;">NAME</td>
          <td style="padding: 5px 0; font-size: 13px; font-weight: 600; color: #111111; text-transform: uppercase;">${(contactInfo?.fullName || "—").toUpperCase()}</td>
        </tr>
        <tr>
          <td style="padding: 5px 0; font-size: 13px; font-weight: 700; color: #888888; text-transform: uppercase; letter-spacing: 0.5px;">PHONE</td>
          <td style="padding: 5px 0; font-size: 13px; font-weight: 600; color: #111111; text-transform: uppercase;">${(contactInfo?.phone || "—").toUpperCase()}</td>
        </tr>
        <tr>
          <td style="padding: 5px 0; font-size: 13px; font-weight: 700; color: #888888; text-transform: uppercase; letter-spacing: 0.5px;">EMAIL</td>
          <td style="padding: 5px 0; font-size: 13px; font-weight: 600; color: #111111; text-transform: uppercase;">${(contactInfo?.email || "—").toUpperCase()}</td>
        </tr>
      </table>
    </div>

    <!-- DIVIDER -->
    <div style="height: 1px; background-color: #ebebeb; margin-bottom: 28px;"></div>

    <!-- PAYMENT DETAILS -->
    <div style="margin-bottom: 36px;">
      <div style="font-size: 10px; font-weight: 700; color: #aaaaaa; text-transform: uppercase; letter-spacing: 1.5px; margin-bottom: 14px;">PAYMENT DETAILS</div>

      <table width="100%" cellpadding="0" cellspacing="0" border="0" style="border-collapse: collapse;">
        <tr>
          <td style="padding: 5px 0; font-size: 13px; font-weight: 700; color: #888888; text-transform: uppercase; letter-spacing: 0.5px; width: 140px;">ORDER NO.</td>
          <td style="padding: 5px 0; font-size: 13px; font-weight: 700; color: #111111; text-transform: uppercase;">${displayOrderNumber}</td>
        </tr>
        <tr>
          <td style="padding: 5px 0; font-size: 13px; font-weight: 700; color: #888888; text-transform: uppercase; letter-spacing: 0.5px;">TRANSACTION ID</td>
          <td style="padding: 5px 0; font-size: 13px; font-weight: 500; color: #444444; word-break: break-all;">${paymentId || "—"}</td>
        </tr>
        <tr>
          <td style="padding: 5px 0; font-size: 13px; font-weight: 700; color: #888888; text-transform: uppercase; letter-spacing: 0.5px;">PROVIDER</td>
          <td style="padding: 5px 0; font-size: 13px; font-weight: 600; color: #111111; text-transform: uppercase;">STRIPE</td>
        </tr>
        <tr>
          <td style="padding: 5px 0; font-size: 13px; font-weight: 700; color: #888888; text-transform: uppercase; letter-spacing: 0.5px;">STATUS</td>
          <td style="padding: 5px 0;">
            <span style="background-color: #ebfbee; color: #2b8a3e; font-size: 11px; font-weight: 700; padding: 3px 8px; letter-spacing: 0.5px; text-transform: uppercase;">PAID</span>
          </td>
        </tr>
      </table>
    </div>

    <!-- DOWNLOAD BUTTON -->
    <div style="margin-bottom: 36px;">
      <a href="${downloadUrl}" target="_blank"
         style="background-color: #000000; color: #ffffff; padding: 14px 28px; font-size: 11px; font-weight: 700; text-decoration: none; display: inline-block; letter-spacing: 2px; text-transform: uppercase;">
        DOWNLOAD RECEIPT
      </a>
    </div>

    <!-- SIGN OFF -->
    <div style="margin-bottom: 8px;">
      <p style="font-size: 13px; font-weight: 600; color: #111111; margin: 0 0 2px 0; letter-spacing: 0.5px;">BEST REGARDS,</p>
      <p style="font-size: 13px; font-weight: 800; letter-spacing: 1px; text-transform: uppercase; color: #111111; margin: 0;">THE ETERNIX TEAM</p>
    </div>

    <!-- BLACK FOOTER -->
    <div style="background-color: #000000; color: #ffffff; padding: 36px 24px; text-align: center; margin-top: 30px;">
      <div style="font-size: 18px; font-weight: 800; text-transform: uppercase; margin-bottom: 12px; letter-spacing: 2px;">ETERNIX</div>
      <div style="font-size: 11px; color: #aaaaaa; text-transform: uppercase; letter-spacing: 1px; margin-bottom: 16px;">
        DEVELOPED BY <a href="https://github.com/bhalodiyavasu" target="_blank" style="color: #ffffff; text-decoration: underline; font-weight: 700; letter-spacing: 1px;">VASU BHALODIYA</a>
      </div>
      <div style="font-size: 10px; color: #888888; text-transform: uppercase; letter-spacing: 0.5px; margin-bottom: 20px;">
        THIS IS AN ORDER CONFIRMATION EMAIL FROM <a href="http://eternix.vasubhalodiya.in/" target="_blank" style="color: #ffffff; text-decoration: underline;">ETERNIX</a>
      </div>
      <div style="font-size: 9px; color: #666666; text-transform: uppercase; letter-spacing: 1px;">&copy; 2026 ETERNIX. ALL RIGHTS RESERVED.</div>
    </div>

  </div>

</body>
</html>`;
};

module.exports = { buildReceiptHtml };
