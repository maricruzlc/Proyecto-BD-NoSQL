const express = require('express');
const router = express.Router();
const seriesController = require('../controllers/seriesController');

// Ruta para obtener todas las series
router.get('/', seriesController.obtenerSeries);

module.exports = router;
