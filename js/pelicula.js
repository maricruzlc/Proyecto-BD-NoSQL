
document.addEventListener('DOMContentLoaded', () => {
    const urlParams = new URLSearchParams(window.location.search);
    const peliculaId = urlParams.get('id');
  
    if (peliculaId) {
      fetch(`/pelicula/${peliculaId}`)
        .then(response => response.json())
        .then(pelicula => {
          const detallesDiv = document.getElementById('detalles-pelicula');
          detallesDiv.innerHTML = `
            <h1>${pelicula.titulo}</h1>
            <img src="${pelicula.poster}" alt="${pelicula.titulo}">
            <p>${pelicula.descripcion}</p>
            <p><strong>Calificación:</strong> ${pelicula.calificacion}</p>
            <p><strong>Género:</strong> ${pelicula.genero}</p>
            <p><strong>Fecha de Estreno:</strong> ${new Date(pelicula.fechaEstreno).toLocaleDateString()}</p>
          `;
        })
        .catch(err => {
          console.error('Error al cargar la película:', err);
          document.getElementById('detalles-pelicula').innerHTML = '<p>Error al cargar la película.</p>';
        });
    } else {
      document.getElementById('detalles-pelicula').innerHTML = '<p>ID de película no proporcionado.</p>';
    }
  });
  