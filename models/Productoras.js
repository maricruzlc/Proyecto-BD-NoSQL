const mongoose = require('mongoose');

const ProductoraSchema = new mongoose.Schema({
  ID_Productora: { type: Number, required: true, unique: true },
  Nombre: { type: String, required: true },
  Descripcion: { type: String, required: true },
});

module.exports = mongoose.model('Productoras', ProductoraSchema, 'Productoras');









