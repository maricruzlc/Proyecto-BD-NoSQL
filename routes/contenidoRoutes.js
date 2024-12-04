const express = require('express');
const router = express.Router();
const contenidoController = require('../controllers/contenidoController');

// Ruta para obtener películas y series
router.get('/', contenidoController.obtenerContenido);

module.exports = router;
