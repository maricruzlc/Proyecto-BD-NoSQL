import User from "../models/User.js"; // Asegúrate de que la ruta sea correcta
import jwt from "jsonwebtoken";

// Registrar un nuevo usuario
async function register(req, res) {
  try {
    const { user, password, email } = req.body;

    // Validar campos
    if (!user || !password || !email) {
      return res.status(400).send({ status: "Error", message: "Los campos están incorrectos" });
    }

    // Verificar si el usuario ya existe
    const existingUser = await User.findOne({ user });
    if (existingUser) {
      return res.status(400).send({ status: "Error", message: "El usuario ya existe" });
    }

    // Crear y guardar el usuario
    const newUser = new User({ user, password, email });
    await newUser.save();

    res.status(201).send({ status: "Success", message: "Usuario registrado exitosamente" });
  } catch (err) {
    console.error(err);
    res.status(500).send({ status: "Error", message: "Error interno del servidor" });
  }
}

// Inicio de sesión
async function login(req, res) {
  try {
    const { user, password } = req.body;

    // Validar campos
    if (!user || !password) {
      return res.status(400).send({ status: "Error", message: "Usuario y contraseña requeridos" });
    }

    // Verificar si el usuario existe
    const existingUser = await User.findOne({ user });
    if (!existingUser) {
      return res.status(404).send({ status: "Error", message: "Usuario no encontrado" });
    }

    // Verificar la contraseña
    const isMatch = await existingUser.comparePassword(password);
    if (!isMatch) {
      return res.status(401).send({ status: "Error", message: "Contraseña incorrecta" });
    }

    // Generar un token JWT
    const token = jwt.sign({ id: existingUser._id, user: existingUser.user }, "secreto", { expiresIn: "1h" });

    res.status(200).send({ status: "Success", message: "Inicio de sesión exitoso", token });
  } catch (err) {
    console.error(err);
    res.status(500).send({ status: "Error", message: "Error interno del servidor" });
  }
}

export const method = {
  login,
  register,
};
