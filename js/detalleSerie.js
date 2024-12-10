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

    
      let NombreDirector = '';
      let NombreGenero = '';
      let NombreProductora = '';
      let NombreTipoContenido = '';
  
    
  
      if (serie.ID_Director === 1) {
        NombreDirector = 'Ridley Scott';
      } else if (serie.ID_Director === 2) {
        NombreDirector = 'Randall Einhorn';
      } else {
        NombreDirector = 'Director no disponible';
      }
  
      if (serie.ID_Genero === 1) {
        NombreGenero = 'Acción';
      } else if (serie.ID_Genero === 2) {
        NombreGenero = 'Comedia';
      } else {
        NombreGenero = 'Género no disponible';
      }
  
      if (serie.ID_Productora === 1) {
        NombreProductora = 'Scott Free Productions';
      } else if (serie.ID_Productora === 2) {
        NombreProductora = 'Deedle-Dee Productions';
      } else {
        NombreProductora = 'Productora no disponible';
      }
  
      if (serie.ID_TipoContenido === 1) {
        NombreTipoContenido = 'Película';
      } else if (serie.ID_TipoContenido === 2) {
        NombreTipoContenido = 'Serie';
      } else {
        NombreTipoContenido = 'Tipo de contenido no disponible';
      }
  
  
    // Actualizar los elementos HTML con los detalles de la serie
    document.getElementById('titulo').textContent = serie.Título;
    document.getElementById('fecha').textContent = serie.FechaLanzamiento;
    document.getElementById('sinopsis').textContent = serie.Sinopsis;
    document.getElementById('temporadas').textContent = serie.Temporadas;
    document.getElementById('episodios').textContent = serie.EpisodiosTotales;
    document.getElementById('director').textContent = NombreDirector; 
    document.getElementById('genero').textContent = NombreGenero; 
    document.getElementById('productora').textContent = NombreProductora; 
    document.getElementById('tipocontenido').textContent = NombreTipoContenido;
    document.getElementById('imagen').src = serie.Imagen;
  } catch (error) {
    console.error('Error al cargar los detalles de la serie:', error);
    alert('No se pudo cargar los detalles de la serie.');
  }
});
