const Listas = require('../models/Listas');

// Obtener todas las listas
exports.getListas = async (req, res) => {
  try {
    const listas = await Listas.find();
    res.status(200).json(listas);
  } catch (error) {
    res.status(500).json({ message: 'Error al obtener listas', error });
  }
};