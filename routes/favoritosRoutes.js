const express = require('express');
const router = express.Router();
const favoritoController = require('../controllers/favoritoController');

// Ruta para obtener todas las 
router.get('/', favoritoController.getFavoritos);

module.exports = router;
