'use strict';

document.addEventListener('DOMContentLoaded', () => {
  // Configuración AOS
  AOS.init({
    duration: 1000,
    once: true,
    mirror: false,
    disable: window.matchMedia('(prefers-reduced-motion: reduce)').matches
  });

  // Scroll suave mejorado
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      e.preventDefault();
      const target = document.querySelector(this.getAttribute('href'));
      if (target) {
        window.scrollTo({
          top: target.offsetTop - 100,
          behavior: 'smooth'
        });
      }
    });
  });

  // Hover effects interactivos
  document.querySelectorAll('.servicio, .destino').forEach(card => {
    card.addEventListener('mousemove', (e) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      card.style.transform = `
        perspective(1000px)
        rotateX(${(y - rect.height/2) / 20}deg)
        rotateY(${-(x - rect.width/2) / 20}deg)
      `;
    });

    card.addEventListener('mouseleave', () => {
      card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0)';
    });
  });

  // Efecto de carga progresiva
  window.addEventListener('load', () => {
    document.body.classList.add('loaded');
    const loader = document.querySelector('.loader');
    if(loader) loader.remove();
  });
});
