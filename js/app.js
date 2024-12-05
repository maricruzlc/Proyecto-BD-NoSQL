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
				<a href="#"><img src="${pelicula.Imagen}" alt="${pelicula.Título}"></a>
				<h4>${pelicula.Título}</h4>
			  </div>
			</div>
		  `;
		  peliculasContainer.innerHTML += peliculaHTML;
		});
	  }
  
	  // Renderizar series si el contenedor 'series' existe
	  const seriesContainer = document.getElementById('series');
	  if (seriesContainer) {
		data.series.forEach((serie) => {
		  const serieHTML = `
			<div class="col-sm-6 col-md-3">
			  <div class="latest-movie">
				<a href="#"><img src="${serie.Imagen}" alt="${serie.Título}"></a>
				<h4>${serie.Título}</h4>
			  </div>
			</div>
		  `;
		  seriesContainer.innerHTML += serieHTML;
		});
	  }
	} catch (error) {
	  console.error('Error al obtener contenido:', error);
	}
  });
  
	  
  document.addEventListener('DOMContentLoaded', async () => {
	try {
	  const response = await fetch('http://localhost:3000/api/noticias'); // Cambia a tu endpoint real
	  const data = await response.json();

	  const newsContainer = document.getElementById('news-container');
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
	} catch (error) {
	  console.error('Error al cargar noticias:', error);
	}
  });
  
  
	   
  

  
  