const Comentario = require('../models/Comentarios');

exports.obtenerComentarios = async (req, res) => {
  try {
    const contenidoId = req.params.id;

    const comentarios = await Comentario.find({ ID_Contenido: contenidoId });

    if (comentarios.length === 0) {
      return res.status(404).json({ mensaje: 'No se encontraron comentarios para este contenido' });
    }

    res.status(200).json(comentarios);
  } catch (err) {
    console.error('Error al obtener los comentarios:', err);
    res.status(500).json({ mensaje: 'Error al obtener los comentarios' });
  }
};

