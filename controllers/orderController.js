const Order = require("../models/Order");
const Product = require("../models/Product");
const User = require("../models/User");

exports.createOrder = async (req, res) => {
  const userIdFromToken = req.user.user.id;
  let { items } = req.body;

  try {
     if (!userIdFromToken) {
      return res.status(404).json({ message: "Usuario no encontrado" });
    }
    items = items.map((item) => ({
      product: item.product?.id || item.product, // Extrae el ID si viene en un objeto
      quantity: item.quantity,
    }));

    const nuevaVenta = await Order.create({
      user: userIdFromToken, // Cambiar userId a user
      items,
      status: "completado",
    });

    if (nuevaVenta) {
      await User.findByIdAndUpdate(
        userIdFromToken,
        { $push: { orders: nuevaVenta._id } }, // Añadimos la orden al campo 'orders'
        { new: true }
      );
      await modificarStockProductos(items);
      res.status(200).json({ message: "Venta exitosa" });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const modificarStockProductos = async (items) => {
  try {
    const updatePromises = items.map(async (item) => {
      const product = await Product.findById(item.product);
      if (!product) {
        throw new Error(`Producto con ID ${item.product} no encontrado`);
      }
      if (product.stock < item.quantity) {
        throw new Error(`Stock insuficiente para el producto ${product.name}`);
      }
      return Product.findByIdAndUpdate(
        item.product,
        { $inc: { stock: -item.quantity } },
        { new: true }
      );
    });
    return Promise.all(updatePromises);
  } catch (error) {
    throw new Error(`Error al actualizar stock: ${error.message}`);
  }
};
