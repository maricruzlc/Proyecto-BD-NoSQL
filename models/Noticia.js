const mongoose = require('mongoose');

const NoticiaSchema = new mongoose.Schema({
  ID_Noticia: {
    type: Number,
    required: true,
    unique: true,
  },
  Titulo: {
    type: String,
    required: true,
  },
  Descripcion: {
    type: String,
    required: true,
  },
  Imagen: {
    type: String,
    required: true,
  },
  FechaPublicacion: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model('Noticia', NoticiaSchema,'Noticias');
