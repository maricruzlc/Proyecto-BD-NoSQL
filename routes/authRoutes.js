import express from "express";
import { method as authController } from "./controllers/authController.js";

const router = express.Router();

// Ruta para registrar un nuevo usuario
router.post("/register", authController.register);

// Ruta para iniciar sesión
router.post("/login", authController.login);

export default router;
