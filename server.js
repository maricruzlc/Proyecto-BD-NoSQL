const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
require('dotenv').config();

//modelos
const Pelicula = require('./models/Pelicula');
const Serie = require('./models/Serie');
const Director = require('./models/Directores');
const Actor = require('./models/Actores');
const Genero = require('./models/Genero');
const Productora = require('./models/Productoras');
const TipoContenido = require('./models/TipoContenido');
const Comentario = require('./models/Comentarios');


const seriesRoutes = require('./routes/seriesRoutes');

const app = express();
app.use(express.json());

// Conectar a MongoDB
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log('Conexión exitosa a MongoDB'))
  .catch((err) => console.error('Error al conectar a MongoDB:', err));

// Importar rutas
const listaRoutes = require('./routes/listasRoutes');
const favoritosRoutes = require('./routes/favoritosRoutes');
// Usar rutas
app.use('/api/listas', listaRoutes);
app.use('/api/favoritos', favoritosRoutes);

// Ruta inicial
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html')); 
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
      ID_Usuario: 1, 
      ID_TipoContenido: 1, 
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

      const director=await Director.findOne({ ID_Director: pelicula.ID_Director }).exec();
      const actor=await Actor.findOne({ ID_Actor: pelicula.ID_Actor }).exec();
      const genero=await Genero.findOne({ ID_Genero: pelicula.ID_Género }).exec();
      const productora=await Productora.findOne({ ID_Productora: pelicula.ID_Productora }).exec();
      const tipoContenido=await TipoContenido.findOne({ ID_TipoContenido: pelicula.ID_TipoContenido }).exec();

      //FALTA AGREGAR LA INFO DE LAS SERIES

  
      //Asignar los nombres basados en los IDs 
      let NombreActor = '';
      let NombreDirector = '';
      let NombreGenero = '';
      let NombreProductora = '';
      let NombreTipoContenido = '';

       NombreActor = actor.Nombre;
       NombreDirector = director.Nombre;
       NombreGenero = genero.Nombre;
       NombreProductora = productora.Nombre;
       NombreTipoContenido = tipoContenido.NombreContenido;

       console.log(NombreActor);
       console.log(NombreDirector);
       console.log(NombreGenero);
       console.log(NombreProductora);
       console.log(NombreTipoContenido);
  
      const peliculaConNombres = {
        ...pelicula.toObject(),
        Actor: NombreActor,
        Director: NombreDirector,
        Genero: NombreGenero,
        Productora: NombreProductora,
        TipoContenido: NombreTipoContenido,
      };

    
  
      console.log(peliculaConNombres); 
  
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
const authRoutes = require('./routes/authRoutes'); 
const authController = require('./controllers/authController');
const comentariosRoutes=require('./routes/comentariosRoutes');
app.post('/usuarios/registro', authController.register);

// Registrar rutas
app.use(express.static(__dirname));
app.use('/api/peliculas', peliculasRoutes);
app.use('/api/series', seriesRoutes);
app.use('/api/contenido', contenidoRoutes);
app.use('/api/noticias', noticiaRoutes);
app.use('/api/comentarios', comentariosRoutes);
app.use('/api', peliculasRoutes);
app.use('/usuarios', authRoutes); 