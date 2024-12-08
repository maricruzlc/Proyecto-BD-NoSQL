const Favorito = require('../models/favoritoModel');

const addFavorite = async (req, res) => {
    const { ID_Favorito, ID_TipoContenido, ID_Usuario } = req.body;

    try {
        const nuevoFavorito = new Favorito({ ID_Favorito, ID_TipoContenido, ID_Usuario });
        await nuevoFavorito.save();
        res.status(200).send('Añadido a favoritos');
    } catch (error) {
        res.status(500).send('Error al añadir a favoritos');
    }
};

module.exports = {
    addFavorite
};