const Favoritos = require('../models/Favoritos');

exports.getFavoritos = async (req, res) => {
  try {
    const favoritos = await Favoritos.find();
    res.status(200).json(favoritos);
  } catch (error) {
    res.status(500).json({ message: 'Error al obtener favoritos', error });
  }
};