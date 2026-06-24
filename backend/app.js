const express = require('express');
const cores = require('cors');
const cookieParser = require('cookie-parser');
const authRoutes = require('./src/routes/authRoutes');
const userRoutes = require("./src/routes/userRoutes");
const productRoutes = require("./src/routes/productRoutes");
const cartRoutes = require("./src/routes/cartRoutes");
const orderRoutes = require("./src/routes/orderRoutes");
const paymentRoutes = require("./src/routes/paymentRoutes");

const app = express();

// Webhook route - raw body must be before express.json()
app.use("/api/payment/webhook", express.raw({ type: "application/json" }));

//Middleware
app.use(express.json());
app.use(cookieParser());
app.use(
  cores({
    origin: 'http://localhost:5173',
    credentials: true,
  })
);

app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);
app.use("/api/products", productRoutes);
app.use("/api/cart", cartRoutes);
app.use("/api/orders", orderRoutes);
app.use("/api/payment", paymentRoutes);

//Test route
app.get("/", (req, res) => {
  res.send("Hello From Server 🚀");
});

module.exports = app;