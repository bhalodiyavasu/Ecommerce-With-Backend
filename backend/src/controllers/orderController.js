const Order = require("../models/Order");
const puppeteer = require("puppeteer");
const fs = require("fs");
const path = require("path");

const getMyOrders = async (req, res) => {
  try {
    const orders = await Order.find({ user: req.user._id })
      .populate("items.product")
      .sort({ createdAt: -1 });

    res.status(200).json({ status: "SUCCESS", count: orders.length, orders });
  } catch (error) {
    res.status(500).json({ status: "FAILURE", message: error.message });
  }
};

// Read BeatriceDeck fonts once at startup
const FONTS_DIR = path.join(__dirname, "../../..", "frontend", "src", "assets", "fonts");
let fontRegularB64 = "";
let fontMediumB64 = "";
let fontExtraboldB64 = "";
try {
  fontRegularB64 = fs.readFileSync(path.join(FONTS_DIR, "BeatriceDeckTRIAL-Regular.ttf")).toString("base64");
  fontMediumB64 = fs.readFileSync(path.join(FONTS_DIR, "BeatriceDeckTRIAL-Medium.ttf")).toString("base64");
  fontExtraboldB64 = fs.readFileSync(path.join(FONTS_DIR, "BeatriceDeckTRIAL-Extrabold.ttf")).toString("base64");
} catch {
  console.warn("[receipt] BeatriceDeck fonts not found, falling back to serif.");
}

// Tiny inline noise SVG using feTurbulence (no external file needed)
const noiseSvgB64 = Buffer.from(
  `<svg xmlns="http://www.w3.org/2000/svg" width="250" height="250">` +
  `<filter id="n"><feTurbulence type="fractalNoise" baseFrequency="0.4" numOctaves="3" stitchTiles="stitch"/>` +
  `<feColorMatrix type="saturate" values="0"/></filter>` +
  `<rect width="250" height="250" filter="url(#n)" opacity="0.4"/></svg>`
).toString("base64");

const generateReceiptHTML = (order) => {
  const fontFaces = fontRegularB64
    ? `
    @font-face { font-family: 'Beatrice Deck'; src: url('data:font/truetype;base64,${fontRegularB64}') format('truetype'); font-weight: 400; }
    @font-face { font-family: 'Beatrice Deck'; src: url('data:font/truetype;base64,${fontMediumB64}') format('truetype'); font-weight: 500; }
    @font-face { font-family: 'Beatrice Deck'; src: url('data:font/truetype;base64,${fontExtraboldB64}') format('truetype'); font-weight: 800; }`
    : "";

  const { contactInfo, shippingInfo, items, orderNumber, paymentId, subtotal, shippingCharge, totalAmount, createdAt } = order;
  const address = `${shippingInfo.address}, ${shippingInfo.city}, ${shippingInfo.state} - ${shippingInfo.postalCode}, ${shippingInfo.country}`;
  const orderDate = new Date(createdAt).toLocaleDateString("en-GB", { day: "numeric", month: "long", year: "numeric" });
  const displayOrderNumber = (orderNumber || order._id).toUpperCase();
  const shippingDisplay = shippingCharge > 0 ? `&#8377;${shippingCharge.toFixed(2)}` : "FREE";

  const itemsHTML = items
    .map((item) => {
      const colorHex = item.color?.hex || "#cccccc";
      const colorName = (item.color?.name || String(item.color || "")).toUpperCase();
      const price = item.product?.price || 0;
      const productName = (item.product?.name || "PRODUCT UNAVAILABLE").toUpperCase();
      return `
      <tr>
        <td class="item-cell">
          <div class="item-name">${productName}</div>
          <div class="item-meta">
            SIZE: ${item.size.toUpperCase()} &nbsp;/&nbsp; COLOR: ${colorName}
            <span class="color-box" style="background-color:${colorHex};"></span>
          </div>
        </td>
        <td class="align-center">${item.quantity}</td>
        <td class="align-right">&#8377;${price.toFixed(2)}</td>
        <td class="align-right">&#8377;${(price * item.quantity).toFixed(2)}</td>
      </tr>`;
    })
    .join("");

  const paymentIdLine = paymentId
    ? `<div class="info-row"><span class="info-label">PAYMENT ID</span><span class="info-val">${paymentId}</span></div>`
    : "";

  return `<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<style>
  ${fontFaces}

  * { margin: 0; padding: 0; box-sizing: border-box; -webkit-print-color-adjust: exact; print-color-adjust: exact; }

  body {
    font-family: 'Inter', system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, sans-serif;
    background: #fff;
    color: #000;
    width: 210mm;
    min-height: 297mm;
    padding: 14mm 15mm 14mm 15mm;
    position: relative;
    font-size: 10pt;
    display: flex;
    flex-direction: column;
  }
  .content-top { flex: 1; }
  .content-bottom { margin-top: auto; }

  body::before {
    content: '';
    position: fixed;
    top: 0; left: 0;
    width: 100%; height: 100%;
    background-image: url('data:image/svg+xml;base64,${noiseSvgB64}');
    background-repeat: repeat;
    opacity: 0.45;
    pointer-events: none;
    z-index: 9999;
  }

  /* ── HEADER ── */
  .header {
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
    margin-bottom: 7mm;
  }
  .brand-name {
    font-family: 'Beatrice Deck', serif;
    font-size: 46pt;
    font-weight: 800;
    color: #000;
    line-height: 1;
    letter-spacing: -0.5px;
    text-transform: uppercase;
  }
  .header-meta { text-align: right; padding-top: 10px; }
  .header-date { font-size: 10pt; font-weight: 400; color: #555; margin-bottom: 3px; text-transform: uppercase; }
  .header-order { font-size: 10pt; font-weight: 700; color: #000; text-transform: uppercase; }

  /* ── DIVIDERS ── */
  .divider { width: 100%; height: 1px; background: #bbb; margin: 5mm 0; }
  .divider-light { width: 100%; height: 1px; background: #bbb; margin: 4mm 0; }

  /* ── BILL TO ── */
  .bill-section { margin-bottom: 6mm; }
  .section-label {
    font-size: 7.5pt;
    font-weight: 700;
    color: #888;
    letter-spacing: 1.5px;
    text-transform: uppercase;
    margin-bottom: 3mm;
  }
  .customer-name {
    font-size: 13pt;
    font-weight: 700;
    color: #000;
    text-transform: uppercase;
    margin-bottom: 2mm;
  }
  .customer-detail {
    font-size: 9.5pt;
    font-weight: 400;
    color: #444;
    line-height: 1.65;
    text-transform: uppercase;
  }

  /* ── TABLE ── */
  table { width: 100%; border-collapse: collapse; margin-bottom: 3mm; }
  thead tr th {
    font-size: 7.5pt;
    font-weight: 700;
    color: #888;
    text-transform: uppercase;
    letter-spacing: 0.5px;
    padding: 0 0 3mm 0;
    border-bottom: 1px solid #bbb;
    text-align: left;
  }
  thead tr th.align-center { text-align: center; }
  thead tr th.align-right { text-align: right; }
  tbody tr td {
    font-size: 10pt;
    font-weight: 500;
    color: #000;
    padding: 4mm 0;
    border-bottom: 1px solid #ebebeb;
    vertical-align: top;
  }
  tbody tr td.align-center { text-align: center; }
  tbody tr td.align-right { text-align: right; }

  .item-name {
    font-size: 10pt;
    font-weight: 700;
    color: #000;
    text-transform: uppercase;
    margin-bottom: 1.5mm;
  }
  .item-meta {
    font-size: 8pt;
    font-weight: 400;
    color: #666;
    display: flex;
    align-items: center;
    gap: 6px;
    text-transform: uppercase;
  }
  .color-box {
    display: inline-block;
    width: 11px;
    height: 11px;
    border: 1px solid #ccc;
    flex-shrink: 0;
  }

  /* ── TOTALS ── */
  .totals-wrap { display: flex; justify-content: flex-end; margin-bottom: 7mm; }
  .totals-block { width: 230px; }
  .total-row {
    display: flex;
    justify-content: space-between;
    align-items: center;
    font-size: 9.5pt;
    font-weight: 600;
    padding: 2.5mm 0;
    color: #000;
    text-transform: uppercase;
    border-bottom: 1px solid #ebebeb;
  }
  .total-row.final {
    border-bottom: none;
    border-top: 1px solid #bbb;
    margin-top: 1mm;
    padding-top: 3mm;
    font-size: 12pt;
    font-weight: 800;
  }

  /* ── BOTTOM INFO ── */
  .bottom-grid {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 10mm;
    margin-top: 4mm;
  }
  .bottom-col-label {
    font-size: 8pt;
    font-weight: 700;
    color: #000;
    text-transform: uppercase;
    letter-spacing: 0.5px;
    margin-bottom: 3mm;
    padding-bottom: 2mm;
    border-bottom: 1px solid #bbb;
  }
  .info-row {
    display: flex;
    gap: 6px;
    font-size: 9pt;
    font-weight: 400;
    color: #333;
    line-height: 1.9;
    text-transform: uppercase;
  }
  .info-label { font-weight: 700; color: #000; white-space: nowrap; }
  .info-val { color: #444; word-break: break-word; }
  .status-badge {
    display: inline-block;
    background: #ebfbee;
    color: #2b8a3e;
    font-size: 7.5pt;
    font-weight: 700;
    padding: 1px 7px;
    letter-spacing: 0.5px;
    text-transform: uppercase;
  }

  /* ── FOOTER ── */
  .footer {
    text-align: center;
    font-size: 7.5pt;
    font-weight: 400;
    color: #aaa;
    margin-top: 7mm;
    padding-top: 4mm;
    border-top: 1px dashed #bbb;
    text-transform: uppercase;
    letter-spacing: 0.5px;
    line-height: 2;
  }
</style>
</head>
<body>

  <div class="content-top">
    <!-- HEADER -->
    <div class="header">
      <div class="brand-name">ETERNIX</div>
      <div class="header-meta">
        <div class="header-date">${orderDate}</div>
        <div class="header-order">ORDER NO. ${displayOrderNumber}</div>
      </div>
    </div>

    <div class="divider"></div>

    <!-- BILL TO -->
    <div class="bill-section">
      <div class="section-label">BILLED TO</div>
      <div class="customer-name">${contactInfo.fullName}</div>
      <div class="customer-detail">${contactInfo.phone}</div>
      <div class="customer-detail">${address}</div>
    </div>

    <div class="divider-light"></div>

    <!-- ITEMS TABLE -->
    <table>
      <thead>
        <tr>
          <th>ITEM</th>
          <th class="align-center">QTY</th>
          <th class="align-right">PRICE</th>
          <th class="align-right">AMOUNT</th>
        </tr>
      </thead>
      <tbody>${itemsHTML}</tbody>
    </table>

    <!-- TOTALS -->
    <div class="totals-wrap">
      <div class="totals-block">
        <div class="total-row">
          <span>SUBTOTAL</span>
          <span>&#8377;${subtotal.toFixed(2)}</span>
        </div>
        <div class="total-row">
          <span>SHIPPING</span>
          <span>${shippingDisplay}</span>
        </div>
        <div class="total-row final">
          <span>TOTAL</span>
          <span>&#8377;${totalAmount.toFixed(2)}</span>
        </div>
      </div>
    </div>
  </div>

  <div class="content-bottom">
    <div class="divider"></div>

    <!-- BOTTOM INFO: Payment + Contact -->
    <div class="bottom-grid">
      <div>
        <div class="bottom-col-label">PAYMENT INFORMATION</div>
        <div class="info-row"><span class="info-label">METHOD</span><span class="info-val">STRIPE</span></div>
        <div class="info-row"><span class="info-label">ORDER</span><span class="info-val">${displayOrderNumber}</span></div>
        ${paymentIdLine}
        <div class="info-row"><span class="info-label">STATUS</span><span class="info-val"><span class="status-badge">PAID</span></span></div>
      </div>
      <div>
        <div class="bottom-col-label">CONTACT INFORMATION</div>
        <div class="info-row"><span class="info-label">NAME</span><span class="info-val">${contactInfo.fullName}</span></div>
        <div class="info-row"><span class="info-label">PHONE</span><span class="info-val">${contactInfo.phone}</span></div>
        <div class="info-row"><span class="info-label">EMAIL</span><span class="info-val">${contactInfo.email}</span></div>
      </div>
    </div>

    <!-- FOOTER -->
    <div class="footer">
      <div>THANK YOU FOR SHOPPING WITH ETERNIX</div>
    </div>
  </div>

</body>
</html>`;
};

const downloadReceipt = async (req, res) => {
  let browser;
  try {
    const order = await Order.findOne({ _id: req.params.orderId, user: req.user._id }).populate("items.product");

    if (!order) {
      return res.status(404).json({ status: "FAILURE", message: "Order not found" });
    }

    const html = generateReceiptHTML(order);

    browser = await puppeteer.launch({
      headless: true,
      args: ["--no-sandbox", "--disable-setuid-sandbox", "--disable-dev-shm-usage"],
    });

    const page = await browser.newPage();
    await page.setContent(html, { waitUntil: "domcontentloaded" });

    const pdf = await page.pdf({
      format: "A4",
      printBackground: true,
      margin: { top: "0", bottom: "0", left: "0", right: "0" },
    });

    await browser.close();
    browser = null;

    const filename = `Eternix_Receipt_${(order.orderNumber || order._id).toUpperCase()}.pdf`;
    res.setHeader("Content-Type", "application/pdf");
    res.setHeader("Content-Disposition", `attachment; filename="${filename}"`);
    res.send(pdf);
  } catch (error) {
    if (browser) await browser.close();
    res.status(500).json({ status: "FAILURE", message: error.message });
  }
};

module.exports = { getMyOrders, downloadReceipt };
