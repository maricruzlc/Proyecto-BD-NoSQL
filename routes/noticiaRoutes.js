const express = require('express');
const router = express.Router();
const noticiaController = require('../controllers/noticiaController');

// Ruta para obtener todas las noticias
router.get('/', noticiaController.getNoticias);



module.exports = router;
