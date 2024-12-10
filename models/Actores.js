const mongoose = require('mongoose');

const ActorSchema = new mongoose.Schema({
    "ID_Actor": Number,
    "Nombre": String,
    "Biografía": String,
    "Filmografía": {
      "Películas": [
        {
          "Título": String,
          "Año": Number,
        }
      ],
      "Series": [
        {
          "Título": String,
          "Año": Number,
        }
      ]
    }
  });

module.exports = mongoose.model('Actores', ActorSchema, 'Actores');