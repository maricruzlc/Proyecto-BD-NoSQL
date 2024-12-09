document.addEventListener('DOMContentLoaded', async () => {
  // Obtener el ID de la serie desde la URL
  const params = new URLSearchParams(window.location.search);
  const id_serie = params.get('id_serie');

  try {
    const response = await fetch(`http://localhost:3000/Series/${id_serie}`);
    if (!response.ok) {
      throw new Error('No se pudo obtener los detalles de la serie');
    }

    const serie = await response.json();

    // Actualizar los elementos HTML con los detalles de la serie
    document.getElementById('titulo').textContent = serie.Título;
    document.getElementById('fecha').textContent = serie.FechaLanzamiento;
    document.getElementById('sinopsis').textContent = serie.Sinopsis;
    document.getElementById('temporadas').textContent = serie.Temporadas;
    document.getElementById('episodios').textContent = serie.EpisodiosTotales;
    document.getElementById('director').textContent = serie.ID_Director; // Idealmente, obtén el nombre del director desde su ID
    document.getElementById('genero').textContent = serie.ID_Genero; // Igualmente, obtener el nombre del protagonista
    document.getElementById('productora').textContent = serie.ID_Productora; // Lo mismo para productora
    document.getElementById('tipocontenido').textContent = serie.ID_TipoContenido;
    document.getElementById('imagen').src = serie.Imagen;
  } catch (error) {
    console.error('Error al cargar los detalles de la serie:', error);
    alert('No se pudo cargar los detalles de la serie.');
  }
});
