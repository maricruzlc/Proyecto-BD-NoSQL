const mongoose = require('mongoose');

const TipoContenidoSchema = new mongoose.Schema({
  ID_TipoContenido: { type: Number, required: true, unique: true },
  NombreContenido: { type: String, required: true },
});

module.exports = mongoose.model('TipoContenido', TipoContenidoSchema, 'TipoContenido');









