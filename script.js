'use strict';

(function () {
  const config = {
    AOS: {
      duration: 1000,
      once: true,
      mirror: false,
      disable: window.matchMedia('(prefers-reduced-motion: reduce)').matches
    },
    scrollOffset: 100
  };

  function init() {
    try {
      // Inicializar animaciones
      if (typeof AOS !== 'undefined') {
        AOS.init(config.AOS);
        document.addEventListener('aos:in', ({ detail }) => {
          console.debug('Animación iniciada:', detail);
        });
      }

      // Scroll suave mejorado
      document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
          e.preventDefault();
          const target = document.querySelector(this.getAttribute('href'));
          if (target) {
            window.scrollTo({
              top: target.offsetTop - config.scrollOffset,
              behavior: 'smooth'
            });
          }
        });
      });

      // Efecto hover en tarjetas
      document.querySelectorAll('.servicio, .destino').forEach(card => {
        card.addEventListener('mouseover', () => {
          card.style.transform = 'translateY(-10px)';
        });
        card.addEventListener('mouseout', () => {
          card.style.transform = 'translateY(0)';
        });
      });

      // Efecto de carga inicial
      window.addEventListener('load', () => {
        document.body.classList.add('loaded');
        console.log('Recursos completamente cargados');
      });

    } catch (error) {
      console.error('Error inicializando:', error);
    }
  }

  // Iniciar cuando el DOM esté listo
  if (document.readyState !== 'loading') {
    init();
  } else {
    document.addEventListener('DOMContentLoaded', init);
  }
})();
