const Pelicula = require('../models/Pelicula');

// Obtener todas las películas
exports.obtenerPeliculas = async (req, res) => {
  try {
    const peliculas = await Pelicula.find();
    res.status(200).json(peliculas);
  } catch (err) {
    res.status(500).json({ mensaje: 'Error al obtener películas', error: err });
  }
};

// Crear una nueva película
exports.crearPelicula = async (req, res) => {
  try {
    const nuevaPelicula = new Pelicula(req.body);
    const peliculaGuardada = await nuevaPelicula.save();
    res.status(201).json(peliculaGuardada);
  } catch (err) {
    res.status(500).json({ mensaje: 'Error al crear película', error: err });
  }
};
