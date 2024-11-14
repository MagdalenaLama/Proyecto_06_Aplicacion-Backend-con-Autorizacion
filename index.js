const express = require("express");
const app = express();
const connectDB = require("./config/db");
const userRoutes = require("./routes/userRoutes");
const productRoutes = require("./routes/productRoutes");
require("dotenv").config();
const PORT = process.env.PORT || 3000;

connectDB();

app.use(express.json());

app.use("/users", userRoutes);
app.use("/products", productRoutes);

app.listen(PORT, () => {
  console.log(`Servidor escuchando en puerto: ${PORT}`);
});
