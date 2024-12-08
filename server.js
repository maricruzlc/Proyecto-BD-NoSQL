const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
require('dotenv').config();

const app = express();
app.use(express.json());

// Conectar a MongoDB
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log('Conexión exitosa a MongoDB'))
  .catch((err) => console.error('Error al conectar a MongoDB:', err));

// Ruta inicial
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html')); // Asegúrate de que index.html esté en la raíz
});




// Importar rutas
const peliculasRoutes = require('./routes/peliculasRoutes');
const seriesRoutes = require('./routes/seriesRoutes');
const contenidoRoutes = require('./routes/contenidoRoutes');
const noticiaRoutes = require('./routes/noticiaRoutes');
const authRoutes = require('./routes/authRoutes'); // Nueva línea
const authController = require('./controllers/authController');


app.post('/usuarios/registro', authController.register);

// Registrar rutas
app.use(express.static(__dirname));
app.use('/api/peliculas', peliculasRoutes);
app.use('/api/series', seriesRoutes);
app.use('/api/contenido', contenidoRoutes);
app.use('/api/noticias', noticiaRoutes);
app.use('/usuarios', authRoutes); // Nueva línea para usuarios

// Iniciar el servidor
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor corriendo en el puerto ${PORT}`);
});
