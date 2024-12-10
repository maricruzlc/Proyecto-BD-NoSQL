const mongoose = require('mongoose');

const PeliculaSchema = new mongoose.Schema({
  ID_Pelicula: { type: Number, required: true, unique: true },
  Titulo: { type: String, required: true },
  FechaLanzamiento: { type: Date, required: true },
  Duracion: { type: Number, required: true },
  Sinopsis: { type: String, required: true },
  ID_Director: { type: Number, required: true },  // Debe ser un ObjectId
  ID_Actor: { type: Number, required: true },  
  ID_Género: { type: Number, required: true },
  Imagen: { type: String, required: true },
  ID_TipoContenido: { type: Number, required: true },
  ID_Productora: { type: Number, required: true },
 
});

module.exports = mongoose.model('Peliculas', PeliculaSchema, 'Peliculas');
