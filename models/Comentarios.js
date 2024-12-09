const mongoose = require('mongoose');

const comentarioSchema = new mongoose.Schema({
  ID_Comentario: {type: Number,required: true,unique: true, },
  ID_TipoContenido: {type: Number,required: true,},
  ID_Usuario: { type: Number, required: true,},
  Fecha: { type: Date, default: Date.now },
  Comentario: {type: String,required: true, },
  Calificacion: {type: Number,  required: true,},

});

// Crear el modelo a partir del esquema
const Comentario = mongoose.model('Comentario', comentarioSchema, 'Comentario');


module.exports = Comentario;
