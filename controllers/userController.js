const User = require("../models/User");
const bcryptjs = require("bcryptjs");
const jwt = require("jsonwebtoken");

exports.getUsers = async (req, res) => {
  try {
    const users = await User.find({}).select("-password");
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};

exports.getUserById = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) {
      return res.status(404).json({ message: "Usuario no encontrado" });
    }
    const foundUser = user.toObject();
    delete foundUser.password;
    res.json(foundUser);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.createUser = async (req, res) => {
  const { name, email, password, role } = req.body;

  const userExists = await User.findOne({ name: name });
  if (userExists)
    return res
      .status(400)
      .json({ message: "Usuario ya se encuentra registrado" });

  const emailExists = await User.findOne({ email: email });
  if (emailExists)
    return res
      .status(400)
      .json({ message: "Email ya se encuentra registrado" });
  try {
    const salt = await bcryptjs.genSalt(10);
    const hashedPassword = await bcryptjs.hash(password, salt);

    const dbResponse = await User.create({
      name,
      email,
      password: hashedPassword,
      role: role ? role : "comprador",
    });
    const newUser = dbResponse.toObject();
    delete newUser.password;
    res.status(201).json(newUser);
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};

exports.login = async (req, res) => {
  const { email, password } = req.body;
  try {
    const foundUser = await User.findOne({ email });

    if (!foundUser) {
      return res.status(400).json({
        msg: "El usuario o la contraseña son incorrectos.",
      });
    }

    const verifiedPass = await bcryptjs.compare(password, foundUser.password);

    if (!verifiedPass) {
      return await res.status(400).json({
        msg: "El usuario o la contraseña no coinciden.",
      });
    }

    const payload = {
      user: {
        id: foundUser.id,
        role: foundUser.role,
      },
    };

    jwt.sign(
      payload,
      process.env.SECRET,
      {
        expiresIn: 360000,
      },
      (error, token) => {
        if (error) throw error;

        res.json({
          msg: "Inicio de sesión exitoso.",
          token,
          user: {
            id: foundUser.id,
            email: foundUser.email,
            role: foundUser.role,
          },
        });
      }
    );

    return;
  } catch (error) {
    console.log(error);
    res.status(500).json({
      msg: "Hubo un problema con la autenticación.",
      data: error,
    });
  }
};

exports.verifyToken = (req, res) => {
  res.status(200).json({ message: "Token válido" });
};

exports.deleteUser = async (req, res) => {
  try {
    const deletedUser = await User.findByIdAndDelete(req.params.id);
    if (!deletedUser) {
      return res.status(404).json({ message: "Usuario no encontrado" });
    }
    console.log(`Usuario eliminado: ${deletedUser.name}`);
    res.json({ message: "Usuario eliminado" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.updateUser = async (req, res) => {
  const userIdFromToken = req.user.user.id;

  try {
    const user = await User.findByIdAndUpdate(req.user.user.id, req.body, {
      new: true,
    }).select("-password");
    if (!user) {
      return res.status(404).json({ message: "Usuario no encontrado" });
    }
    res.json(user);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
