const User = require("../models/User");
const bcryptjs = require("bcryptjs");

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
  const { name, email, password } = req.body;
  try {
    const salt = await bcryptjs.genSalt(10);
    const hashedPassword = await bcryptjs.hash(password, salt);

    const dbResponse = await User.create({
      name,
      email,
      password: hashedPassword,
    });
    const newUser = dbResponse.toObject();
    delete newUser.password;
    res.status(201).json(newUser);
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
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
  try {
    const user = await User.findByIdAndUpdate(req.params.id, req.body, {
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
