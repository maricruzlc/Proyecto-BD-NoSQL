const Pelicula = require('../models/Pelicula');
const Director = require('../models/Directores');
const Comentario = require('../models/Comentarios');
const Serie = require('../models/Serie'); 


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



  const mongoose = require('mongoose');
  const winston = require('winston');
const logger = winston.createLogger({
  level: 'info',
  transports: [
    new winston.transports.Console(),
    new winston.transports.File({ filename: 'app.log' })
  ]
});


exports.obtenerPelicula = async (req, res) => {
  try {
    const peliculaId = req.params.id;

    const pelicula = await Pelicula.findOne({ ID_Pelicula: peliculaId })
      .populate('ID_Director', 'Nombre') // Solo el campo 'Nombre' del director
      .exec();

    if (!pelicula) {
      return res.status(404).json({ message: 'Película no encontrada' });
    }

    res.json(pelicula);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error en el servidor' });
  }
};
