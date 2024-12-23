const jwt = require("jsonwebtoken");

exports.verifyUserToken = (req, res, next) => {
  const token = req.headers["authorization"];
  if (!token) return res.status(403).json({ message: "Token requerido" });

  jwt.verify(token, process.env.SECRET, (err, decoded) => {
    if (err) return res.status(401).json({ message: "Token inválido" });
    req.user = decoded;

    next();
  });
};

exports.verifyAdminToken = (req, res, next) => {
  const token = req.headers["authorization"];
  if (!token) return res.status(403).json({ message: "Token requerido" });

  try {
    const openToken = jwt.verify(token, process.env.SECRET);

    if (openToken.user.role !== "admin") {
      return res
        .status(403)
        .json({ message: "Rol de administrador requerido para esta ruta" });
    }
    next();
  } catch (error) {
    return res.json({
      msg: "Hubo un error con el token.",
    });
  }
};

exports.verifyVenta = (req, res, next) => {
  const { estado } = req.query;
  if (estado !== "completado") {
    return res.status(401).json({ message: "No se pudo realizar la venta" });
  }
  next();
};
