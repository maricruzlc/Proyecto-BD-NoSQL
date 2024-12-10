const mongoose = require('mongoose');

const ListaSchema = new mongoose.Schema({
  ID_Lista: { 
    type: Number, 
    required: true, 
    unique: true 
  },
  Nombre: { 
    type: String, 
    required: true 
  },
});

module.exports = mongoose.model('Listas', ListaSchema, 'Listas');

