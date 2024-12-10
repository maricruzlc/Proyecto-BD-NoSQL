const mongoose = require('mongoose');

const GeneroSchema = new mongoose.Schema({
  ID_Genero: { type: Number, required: true, unique: true },
  Nombre: { type: String, required: true },
});

module.exports = mongoose.model('Genero', GeneroSchema, 'Genero');









