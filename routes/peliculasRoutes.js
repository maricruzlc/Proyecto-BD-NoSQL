const express = require('express');
const router = express.Router();
const peliculasController = require('../controllers/peliculasController');

// Ruta para obtener todas las películas
router.get('/', peliculasController.obtenerPeliculas);

// Ruta para crear una nueva película
router.post('/', peliculasController.crearPelicula);

module.exports = router;
