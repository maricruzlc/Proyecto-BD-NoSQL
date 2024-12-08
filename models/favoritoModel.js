const mongoose = require('mongoose');
const FavoritoSchema = new mongoose.Schema({
    ID_Favorito: { type: Number, required: true },
    ID_TipoContenido: { type: Number, required: true },
    ID_Usuario: { type: Number, required: true }
});

module.exports = mongoose.model('Favorito', FavoritoSchema);