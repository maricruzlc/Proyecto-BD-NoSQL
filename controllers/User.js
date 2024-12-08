const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

// Definir el esquema de usuario
const userSchema = new mongoose.Schema({
  user: {
    type: String,
    required: true,
    unique: true,
    trim: true,
  },
  password: {
    type: String,
    required: true,
    minlength: 6,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    match: [/\S+@\S+\.\S+/, "Por favor, proporciona un correo electrónico válido"],
  },
}, { timestamps: true });

// Middleware para encriptar la contraseña antes de guardar
userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();
  try {
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
  } catch (err) {
    next(err);
  }
});

// Método para comparar contraseñas
userSchema.methods.comparePassword = async function (candidatePassword) {
  return await bcrypt.compare(candidatePassword, this.password);
};

// Crear el modelo
const User = mongoose.model("User", userSchema, "Usuarios");

module.exports = User;
