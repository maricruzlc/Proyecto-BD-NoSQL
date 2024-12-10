const mongoose = require('mongoose');

const FavoritoSchema = new mongoose.Schema({
  ID_Favorito: { type: Number, required: true, unique: true },
  Titulo: { type: String, required: true },
  Imagen: { type: String, required: true },
  ID_TipoContenido: { type: Number, required: true },
 
});

module.exports = mongoose.model('Favoritos', FavoritoSchema, 'Favoritos');
