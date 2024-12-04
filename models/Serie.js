const mongoose = require('mongoose');

const SerieSchema = new mongoose.Schema({
  ID_Serie: { type: Number, required: true, unique: true },
  Titulo: { type: String, required: true },
  Temporadas: { type: Number, required: true },
  EpisodiosTotales: { type: Number, required: true },
  FechaLanzamiento: { type: Date, required: true },
  Sinopsis: { type: String, required: true },
  ID_Director: { type: Number, required: true },
  ID_Protagonista: { type: Number, required: true },
  ID_Genero: { type: Number, required: true },
  Imagen: { type: String, required: true },
  ID_TipoContenido: { type: Number, required: true },
  ID_Productora: { type: Number, required: true },
});

module.exports = mongoose.model('Serie', SerieSchema, 'Series');

