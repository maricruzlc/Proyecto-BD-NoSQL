const Serie = require('../models/Serie');

// Obtener todas las series
exports.obtenerSeries = async (req, res) => {
  try {
    const series = await Serie.find();
    res.status(200).json(series);
  } catch (err) {
    res.status(500).json({ mensaje: 'Error al obtener series', error: err });
  }
};
