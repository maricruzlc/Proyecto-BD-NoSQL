document.addEventListener('DOMContentLoaded', async () => {
  try {
    const urlParams = new URLSearchParams(window.location.search);
    const peliculaId = urlParams.get('id'); // Asegúrate de que este sea el ID de una película válida

    const response = await fetch(`http://localhost:3000/Peliculas/${peliculaId}`);
    if (!response.ok) {
      throw new Error(`Error en la respuesta de la API: ${response.status}`);
    }

    const data = await response.json();

    // Mostrar la información de la película
    document.getElementById('titulo').innerText = data.pelicula.Título || "Título no disponible";
    document.getElementById('fecha').innerText = new Date(data.pelicula.FechaLanzamiento).toLocaleDateString() || "Fecha no disponible";
    document.getElementById('imagen').src = data.pelicula.Imagen;
    document.getElementById('sinopsis').innerText = data.pelicula.Sinopsis || "Sinopsis no disponible";
    document.getElementById('duracion').innerText = `${data.pelicula.Duración} minutos` || "Duración no disponible";
    document.getElementById('director').innerText = data.pelicula.Director || "Director no disponible";
    document.getElementById('actor').innerText = data.pelicula.Actor || "Actor no disponible";
    document.getElementById('genero').innerText = data.pelicula.Genero || "Género no disponible";
    document.getElementById('productora').innerText = data.pelicula.Productora || "Productora no disponible";
    document.getElementById('tipocontenido').innerText = data.pelicula.TipoContenido || "Tipo de contenido no disponible";

  } catch (error) {

  }
});

document.addEventListener('DOMContentLoaded', async () => {
  const tipoContenido = 1;  // Establecer el ID_TipoContenido que deseas filtrar, o puedes obtenerlo dinámicamente
  try {
    const response = await fetch(`http://localhost:3000/comentarios?ID_TipoContenido=${tipoContenido}`);
    const comentarios = await response.json();

    const comentariosList = document.getElementById('comentarios-list');
    comentariosList.innerHTML = ''; // Limpiar la lista antes de agregar los nuevos comentarios

    comentarios.forEach(comentario => {
      const comentarioItem = document.createElement('li');
      comentarioItem.innerHTML = `
        <strong>Calificación: ${comentario.Calificacion}</strong><br>
        <p>${comentario.Comentario}</p>
        <small>Publicado el ${new Date(comentario.Fecha).toLocaleDateString()}</small>
        
      `;
      comentariosList.appendChild(comentarioItem);
    });
  } catch (error) {
    console.error('Error al cargar los comentarios:', error);
  }
});



// Agregar un nuevo comentario
document.addEventListener('DOMContentLoaded', async () => {
  const tipoContenido = 1;  // Establecer el ID_TipoContenido que deseas filtrar

  try {
    // Cargar los comentarios
    const response = await fetch(`http://localhost:3000/comentarios?ID_TipoContenido=${tipoContenido}`);
    const comentarios = await response.json();

    const comentariosList = document.getElementById('comentarios-list');
    comentariosList.innerHTML = ''; // Limpiar la lista antes de agregar los nuevos comentarios

    comentarios.forEach(comentario => {
      const comentarioItem = document.createElement('li');
      comentarioItem.innerHTML = `
        <strong>Calificación: ${comentario.Calificacion}</strong><br>
        <p>${comentario.Comentario}</p>
        <small>Publicado el ${new Date(comentario.Fecha).toLocaleDateString()}</small>
      `;
      comentariosList.appendChild(comentarioItem);
    });
  } catch (error) {
    console.error('Error al cargar los comentarios:', error);
  }

  // Agregar un nuevo comentario
  const comentarioForm = document.getElementById('comentarioForm');
  comentarioForm.addEventListener('submit', async (event) => {
    event.preventDefault(); // Evita que el formulario recargue la página

    const comentario = document.getElementById('comentario').value;
    const calificacion = document.getElementById('calificacion').value;

    const nuevoComentario = {
      Comentario: comentario,
      Calificacion: parseInt(calificacion),
      Fecha: new Date().toISOString(), // Usamos la fecha actual
      ID_TipoContenido: tipoContenido
    };

    try {
      const postResponse = await fetch('http://localhost:3000/comentarios', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(nuevoComentario)
      });

      if (!postResponse.ok) {
        throw new Error('Error al agregar el comentario');
      }

      // Limpiar el formulario
      comentarioForm.reset();

      // Recargar los comentarios para mostrar el nuevo
      const newComentarios = await fetch(`http://localhost:3000/comentarios?ID_TipoContenido=${tipoContenido}`);
      const comentarios = await newComentarios.json();
      const comentariosList = document.getElementById('comentarios-list');
      comentariosList.innerHTML = '';

      comentarios.forEach(comentario => {
        const comentarioItem = document.createElement('li');
        comentarioItem.innerHTML = `
          <strong>Calificación: ${comentario.Calificacion}</strong><br>
          <p>${comentario.Comentario}</p>
          <small>Publicado el ${new Date(comentario.Fecha).toLocaleDateString()}</small>
        `;
        comentariosList.appendChild(comentarioItem);
      });
    } catch (error) {
      console.error('Error al agregar el comentario:', error);
    }
  });
});


