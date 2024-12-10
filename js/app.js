(function($, document, window){
	
	$(document).ready(function(){

		// Cloning main navigation for mobile menu
		$(".mobile-navigation").append($(".main-navigation .menu").clone());

		// Mobile menu toggle 
		$(".menu-toggle").click(function(){
			$(".mobile-navigation").slideToggle();
		});
		$(".search-form button").click(function(){
			$(this).toggleClass("active");
			var $parent = $(this).parent(".search-form");

			$parent.find("input").toggleClass("active").focus();
		});


		$(".slider").flexslider({
			controlNav: false,
			prevText:'<i class="fa fa-chevron-left"></i>',
			nextText:'<i class="fa fa-chevron-right"></i>',
		});
		if( $(".map").length ) {
			$('.map').gmap3({
				map: {
					options: {
						maxZoom: 14 
					}  
				},
				marker:{
					address: "40 Sibley St, Detroit",
				}
			},
			"autofit" );
	    	
	    }
	});

	$(window).load(function(){

	});

})(jQuery, document, window);

document.addEventListener('DOMContentLoaded', async () => {
  try {
    const response = await fetch('http://localhost:3000/api/contenido');
    const data = await response.json();

    // Renderizar películas si el contenedor 'peliculas' existe
    const peliculasContainer = document.getElementById('peliculas');
    if (peliculasContainer) {
      data.peliculas.forEach((pelicula) => {
        const peliculaHTML = `
          <div class="col-sm-6 col-md-3">
            <div class="latest-movie">
              <!-- Redirigir a detalle.html usando el ID de la película -->
              <a href="/detalle.html?id=${pelicula.ID_Pelicula}">
                <img src="${pelicula.Imagen}" alt="${pelicula.Título}">
              </a>
              <h4>${pelicula.Título}</h4>
            </div>
          </div>
        `;
        peliculasContainer.innerHTML += peliculaHTML;
      });
    }

  } catch (error) {
    console.error('Error al obtener las películas:', error);
  }
  
});
	  
  document.addEventListener('DOMContentLoaded', async () => {
	// Verificar si estamos en la página index.html o detalle.html
	if (window.location.pathname === "/index.html" || window.location.pathname === "/") {
	  try {
		const response = await fetch('http://localhost:3000/api/peliculas'); // Asegúrate de usar el endpoint correcto
		const peliculas = await response.json();
  
		// Renderizar películas solo si el contenedor está vacío
		const peliculasContainer = document.getElementById('peliculas');
		if (peliculasContainer && peliculasContainer.innerHTML === "") {  // Verifica si ya hay contenido
		  peliculas.forEach((pelicula) => {
			const peliculaHTML = `
			  <div class="col-sm-6 col-md-3">
				<div class="latest-movie">
				  <a href="/detalle.html?id=${pelicula.ID_Pelicula}">
					<img src="${pelicula.Imagen}" alt="${pelicula.Titulo}">
				  </a>
				  <h4>${pelicula.Titulo}</h4>
				</div>
			  </div>
			`;
			peliculasContainer.innerHTML += peliculaHTML;
		  });
		}
	  } catch (error) {
		console.error('Error al obtener las películas:', error);
	  }
	}
  
	// Para la página detalle.html
	if (window.location.pathname === "/detalle.html") {
	  const urlParams = new URLSearchParams(window.location.search);
	  const peliculaId = urlParams.get('id');
	  const url = `http://localhost:3000/api/peliculas/${peliculaId}`;
  
	  fetch(url)
		.then(response => response.json())
		.then(pelicula => {
		  // Verifica si la película existe
		  console.log(pelicula);
  
		  // Asigna los datos al HTML
		  const tituloElement = document.getElementById('Titulo');
		  const sinopsisElement = document.getElementById('Sinopsis');
		  const imagenElement = document.getElementById('imagen');
  
		  if (pelicula) {
			// Si la película existe, se muestra en el HTML
			tituloElement.textContent = pelicula.Titulo || 'Título no disponible';
			sinopsisElement.textContent = pelicula.Sinopsis || 'Descripción no disponible';
			imagenElement.src = pelicula.Imagen || 'ruta/a/imagen/default.jpg';
		  } else {
			sinopsisElement.textContent = 'Película no encontrada';
		  }
		})
		.catch(err => {
		  console.error('Error al obtener película:', err);
		  const sinopsisElement = document.getElementById('Sinopsis');
		  sinopsisElement.textContent = 'Error al cargar los datos de la película.';
		});
	}
  });
  

  document.addEventListener('DOMContentLoaded', async () => {
	try {
	  const response = await fetch('http://localhost:3000/api/noticias'); // Cambia a tu endpoint real
	  const data = await response.json();
  
	  const newsContainer = document.getElementById('news-container');
	  if (newsContainer) { // Verifica si el contenedor existe
		newsContainer.innerHTML = ""; // Limpia el contenedor
  
		data.forEach((noticia) => {
		  const newsHTML = `
			<div class="news-item">
			  <img src="${noticia.Imagen}" alt="${noticia.Titulo}">
			  <div class="news-content">
				<div class="news-category">Noticias - Actualidad</div>
				<h3 class="news-title">${noticia.Titulo}</h3>
				<p class="news-description">${noticia.Descripcion}</p> <!-- Muestra toda la descripción -->
				<p class="news-date">${new Date(noticia.FechaPublicacion).toLocaleDateString()}</p>
			  </div>
			</div>
		  `;
		  newsContainer.innerHTML += newsHTML;
		});

	  }
	} catch (error) {
	  console.error('Error al cargar noticias:', error);
	}
  });
  
  document.addEventListener('DOMContentLoaded', async () => {
    try {
      // Hacer la solicitud para obtener las series
      const response = await fetch('http://localhost:3000/api/Series'); 
      if (!response.ok) {
        throw new Error('No se pudieron cargar las series');
      }

      const series = await response.json(); // Parsear la respuesta en formato JSON

      // Obtener el contenedor de las series
      const seriesContainer = document.getElementById('series');

      // Crear los elementos de cada serie y agregarlos al contenedor
      series.forEach(serie => {
        const serieCard = document.createElement('div');
        serieCard.classList.add('serie-card'); // Asegúrate de tener estilos para .serie-card

        serieCard.innerHTML = `
          <a href="detalleSerie.html?id_serie=${serie.ID_Serie}">
            <img src="${serie.Imagen}" alt="${serie.Titulo}">
            <h3>${serie.Título}</h3>
          </a>
        `;
        seriesContainer.appendChild(serieCard);
      });
    } catch (error) {
      console.error('Error al cargar las series:', error);
      
    }
  });
  
	   
  

  
  