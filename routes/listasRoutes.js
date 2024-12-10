const express = require('express');
const router = express.Router();
const ListaController = require('../controllers/ListaController');

// Ruta para obtener todas las listas
router.get('/', ListaController.getListas);

module.exports = router;
