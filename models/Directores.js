const mongoose = require('mongoose');

const DirectorSchema = new mongoose.Schema({
  
  ID_Director: { type: Number, required: true },
  Nombre: { type: String, required: true },

});

module.exports = mongoose.model('Directores', DirectorSchema);