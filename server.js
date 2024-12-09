const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
require('dotenv').config();
const Pelicula = require('./models/Pelicula');
const Director = require('./models/Directores');
const Comentario = require('./models/Comentarios');

const Serie=require('./models/Serie');
const seriesRoutes = require('./routes/seriesRoutes');





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

// Endpoint para agregar comentarios
app.post('/comentarios', async (req, res) => {
  try {
    // Datos recibidos desde el formulario
    const { Comentario: texto, Calificacion: calificacion } = req.body;

    if (!texto || !calificacion) {
      return res.status(400).json({ message: 'Comentario y Calificación son requeridos' });
    }

    // Crear datos adicionales automáticamente
    const nuevoComentario = new Comentario({
      ID_Comentario: Math.floor(Math.random() * 1000000), // Generar ID único
      ID_Usuario: 1, // Puedes cambiar esto según el usuario autenticado
      ID_TipoContenido: 1, // Tipo de contenido predeterminado
      Fecha: new Date(),
      Comentario: texto,
      Calificacion: calificacion,
    });

    // Guardar en la base de datos
    const resultado = await nuevoComentario.save();
    res.status(201).json({ message: 'Comentario agregado con éxito', data: resultado });
  } catch (error) {
    console.error('Error al guardar el comentario:', error);
    res.status(500).json({ message: 'Error al guardar el comentario', error });
  }
});



  app.get('/Peliculas/:id', async (req, res) => {
    try {
      const peliculaId = req.params.id;
      console.log('ID de película recibido:', peliculaId);
  
      // Buscar la película por ID
      const pelicula = await Pelicula.findOne({ ID_Pelicula: peliculaId }).exec();
      if (!pelicula) {
        return res.status(404).json({ message: 'Película no encontrada' });
      }
  
      // Buscar todas las películas con el mismo ID_TipoContenido
      const peliculasRelacionadas = await Pelicula.find({ ID_TipoContenido: pelicula.ID_TipoContenido }).exec();
  
      // Obtener los comentarios de todas las películas con el mismo ID_TipoContenido
      const comentarios = await Comentario.find({ ID_TipoContenido: pelicula.ID_TipoContenido })
        .select('Comentario Calificacion Fecha ID_Usuario')
        .exec();
  
      // Asignar los nombres basados en los IDs (como ya lo tienes en tu código)
      let NombreActor = '';
      let NombreDirector = '';
      let NombreGenero = '';
      let NombreProductora = '';
      let NombreTipoContenido = '';
  
      if (pelicula.ID_Actor === 1) {
        NombreActor = 'Paul Mescal';
      } else if (pelicula.ID_Actor === 2) {
        NombreActor = 'Steve Carell';
      } else {
        NombreActor = 'Actor no disponible';
      }
  
      if (pelicula.ID_Director === 1) {
        NombreDirector = 'Ridley Scott';
      } else if (pelicula.ID_Director === 2) {
        NombreDirector = 'Randall Einhorn';
      } else {
        NombreDirector = 'Director no disponible';
      }
  
      if (pelicula.ID_Género === 1) {
        NombreGenero = 'Acción';
      } else if (pelicula.ID_Género === 2) {
        NombreGenero = 'Comedia';
      } else {
        NombreGenero = 'Género no disponible';
      }
  
      if (pelicula.ID_Productora === 1) {
        NombreProductora = 'Scott Free Productions';
      } else if (pelicula.ID_Productora === 2) {
        NombreProductora = 'Deedle-Dee Productions';
      } else {
        NombreProductora = 'Productora no disponible';
      }
  
      if (pelicula.ID_TipoContenido === 1) {
        NombreTipoContenido = 'Película';
      } else if (pelicula.ID_TipoContenido === 2) {
        NombreTipoContenido = 'Serie';
      } else {
        NombreTipoContenido = 'Tipo de contenido no disponible';
      }
  
      const peliculaConNombres = {
        ...pelicula.toObject(),
        Actor: NombreActor,
        Director: NombreDirector,
        Genero: NombreGenero,
        Productora: NombreProductora,
        TipoContenido: NombreTipoContenido,
      };
  
      console.log(peliculaConNombres);  // Verificar la respuesta antes de enviarla
  
      // Enviar la respuesta con la película, las películas relacionadas y los comentarios
      res.json({
        pelicula: peliculaConNombres,
        peliculasRelacionadas: peliculasRelacionadas.map(peli => ({
          ID_Pelicula: peli.ID_Pelicula,
          Titulo: peli.Titulo,
          TipoContenido: peli.ID_TipoContenido,
        })),
        comentarios,
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Error en el servidor' });
    }
  });
  
  
  
 /*
  app.get('/peliculas', async (req, res) => {
    try {
      const peliculas = await Pelicula.find().populate('ID_Director', 'Nombre').exec();
      res.json(peliculas);  // Puedes enviar la respuesta como JSON para el front-end
    } catch (err) {
      console.error('Error al obtener las películas:', err);
      res.status(500).json({ mensaje: 'Error al obtener las películas', error: err.message });
    }
  });*/
  
  // Ruta para servir el archivo detalle.html
  /*app.get('/detalle', (req, res) => {
    res.sendFile(path.join(__dirname, 'detalle.html'));
  });*/
  
// Endpoint para obtener comentarios
app.get('/comentarios', async (req, res) => {
  const tipoContenido = req.query.ID_TipoContenido;  // Obtener el valor de ID_TipoContenido desde los parámetros de la URL
  try {
    // Verifica si se proporciona un valor de tipo de contenido
    const query = tipoContenido ? { ID_TipoContenido: tipoContenido } : {};
    
    // Recupera los comentarios filtrados por ID_TipoContenido, o todos los comentarios si no se pasa ese parámetro
    const comentarios = await Comentario.find(query);
    
    console.log('Comentarios recuperados:', comentarios);
    
    if (comentarios.length === 0) {
      console.log('No hay comentarios para el ID_TipoContenido proporcionado.');
    }
    
    res.json(comentarios);  // Devuelve los comentarios filtrados en formato JSON
  } catch (error) {
    console.error('Error al obtener los comentarios:', error);
    res.status(500).json({ error: 'Error al obtener los comentarios' });
  }
});

app.use('/Series', seriesRoutes);


  
app.listen(3000, () => {
  console.log('Servidor corriendo en http://localhost:3000');
});



// Importar rutas
const peliculasRoutes = require('./routes/peliculasRoutes');
const contenidoRoutes = require('./routes/contenidoRoutes');
const noticiaRoutes = require('./routes/noticiaRoutes');
const authRoutes = require('./routes/authRoutes'); // Nueva línea
const authController = require('./controllers/authController');
const comentariosRoutes=require('./routes/comentariosRoutes')
app.post('/usuarios/registro', authController.register);

// Registrar rutas
app.use(express.static(__dirname));
app.use('/api/peliculas', peliculasRoutes);
app.use('/api/series', seriesRoutes);
app.use('/api/contenido', contenidoRoutes);
app.use('/api/noticias', noticiaRoutes);
app.use('/api/comentarios', comentariosRoutes);
app.use('/api', peliculasRoutes);
app.use('/usuarios', authRoutes); // Nueva línea para usuarios


// Iniciar el servidor

