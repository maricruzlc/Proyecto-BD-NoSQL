const Noticia = require('../models/Noticia');

// Obtener todas las noticias
exports.getNoticias = async (req, res) => {
  try {
    const noticias = await Noticia.find();
    res.status(200).json(noticias);
  } catch (error) {
    res.status(500).json({ message: 'Error al obtener noticias', error });
  }
};