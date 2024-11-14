const express = require("express");
const app = express();
const connectDB = require("./config/db");
const PORT = process.env.PORT || 3000;

require("dotenv").config();
connectDB();

app.use(express.json());
app.listen(PORT, () => {
  console.log(`Servidor escuchando en puerto: ${PORT}`);
});
