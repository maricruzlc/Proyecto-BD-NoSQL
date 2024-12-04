const Pelicula = require('../models/Pelicula');
const Serie = require('../models/Serie');

// Obtener 10 películas y 10 series
exports.obtenerContenido = async (req, res) => {
    try {
      const peliculas = await Pelicula.find({});
      const series = await Serie.find({});
  
      res.status(200).json({ peliculas, series });
    } catch (err) {
      res.status(500).json({ mensaje: 'Error al obtener contenido', error: err });
    }
  };
  
  
