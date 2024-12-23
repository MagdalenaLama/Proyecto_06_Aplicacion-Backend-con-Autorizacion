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
      notification_url:
        "https://proyecto-06-aplicacion-backend-con.onrender.com/webhook",
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

app.post("/webhook", async (req, res) => {
  try {
    const paymentData = req.body;
    console.log("Notificación recibida:", paymentData);

    if (paymentData.type === "payment") {
      // Consulta a la API de Mercado Pago para obtener detalles del pago
      const paymentId = paymentData.data.id;
      const paymentInfo = await obtenerDetallePago(paymentId);

      if (paymentInfo.status === "approved") {
        // Actualiza el inventario
        await actualizarInventario(paymentInfo);
      }
    }

    res.sendStatus(200); // Responde con éxito
  } catch (error) {
    console.error("Error procesando la notificación:", error);
    res.sendStatus(500);
  }
});

const obtenerDetallePago = async (paymentId) => {
  // Llama a la API de Mercado Pago para obtener los detalles del pago
  const axios = require("axios");
  const accessToken = process.env.MERCADO_PAGO_ACCESS_TOKEN;
  const response = await axios.get(
    `https://api.mercadopago.com/v1/payments/${paymentId}`,
    {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    }
  );
  return response.data;
};

const actualizarInventario = async (paymentInfo) => {
  // Lógica para actualizar el inventario en tu base de datos
  console.log(`Actualizando inventario para el pago: ${paymentInfo.id}`);
  // Implementa la lógica según tu base de datos
};

swaggerSetup(app);

app.listen(PORT, () => {
  console.log(`Servidor escuchando en puerto: ${PORT}`);
  console.log(`Documentacion en http://localhost:${PORT}/api-docs`);
});
