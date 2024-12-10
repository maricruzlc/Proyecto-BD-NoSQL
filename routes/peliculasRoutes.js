const express = require('express');
const router = express.Router();
const peliculasController = require('../controllers/peliculasController');
const ComentarioController = require('../controllers/ComentariosController');  // Importa el controlador


// Ruta para obtener todas las películas
router.get('/', peliculasController.obtenerPeliculas);

// Ruta para crear una nueva película
router.post('/', peliculasController.crearPelicula);

router.get('/:id', peliculasController.obtenerPelicula);

module.exports = router;
