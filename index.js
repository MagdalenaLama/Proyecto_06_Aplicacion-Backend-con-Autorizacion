const express = require("express");
const app = express();
const connectDB = require("./config/db");
const userRoutes = require("./routes/userRoutes");
const productRoutes = require("./routes/productRoutes");
const orderRoutes = require("./routes/orderRoute");
require("dotenv").config();
const PORT = process.env.PORT || 3000;
const swaggerSetup = require("./swagger");
const cors = require("cors");
const mercadopago = require("mercadopago");
const preference = require("mercadopago");

const MercadoPagoConfig = mercadopago.MercadoPagoConfig;
const Payment = mercadopago.Payment;
const Preference = mercadopago.Preference;

const client = new MercadoPagoConfig({
  accessToken: process.env.MERCADO_PAGO_ACCESS_TOKEN,
});

const payment = new Payment(client);

connectDB();

app.use(express.json());

app.use(cors());

app.use("/users", userRoutes);
app.use("/products", productRoutes);
app.use("/order", orderRoutes);

app.post("/create_preference", async (req, res) => {
  try {
    console.log("Req", req.body.items);
    const items = req.body.items.map((item) => ({
      title: item.title,
      quantity: Number(item.quantity),
      unit_price: Number(item.unit_price),
      currency_id: "CLP",
    }));
    console.log(items);
    const body = {
      items,
      back_urls: {
        success: "https://esterodeloica.netlify.app/",
        failure: "https://www.youtube.com",
        pending: "https://www.gmail.com",
      },
      auto_return: "approved",
    };
    const preference = new Preference(client);
    const result = await preference.create({ body });
    res.json({
      id: result.id,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      error: "Error al crear la preferencia",
    });
  }
});

swaggerSetup(app);

app.listen(PORT, () => {
  console.log(`Servidor escuchando en puerto: ${PORT}`);
  console.log(`Documentacion en http://localhost:${PORT}/api-docs`);
});
