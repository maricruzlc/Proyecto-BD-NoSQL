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


exports.obtenerSerie = async (req, res) => {
  try {
    const serieId = req.params.id;
    const serie = await Serie.findOne({ ID_Serie: serieId });

    if (!serie) {
      return res.status(404).json({ message: 'Serie no encontrada' });
    }

    res.json(serie);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error en el servidor' });
  }
};