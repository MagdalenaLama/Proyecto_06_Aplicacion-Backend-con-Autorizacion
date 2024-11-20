const express = require("express");
const app = express();
const connectDB = require("./config/db");
const userRoutes = require("./routes/userRoutes");
const productRoutes = require("./routes/productRoutes");
require("dotenv").config();
const PORT = process.env.PORT || 3000;
const swaggerSetup = require("./swagger");
const cors = require("cors");

connectDB();

app.use(express.json());

app.use(cors());

app.use("/users", userRoutes);
app.use("/products", productRoutes);

swaggerSetup(app);

app.listen(PORT, () => {
  console.log(`Servidor escuchando en puerto: ${PORT}`);
  console.log(`Documentacions en http://localhost:${PORT}/api-docs`);
});
