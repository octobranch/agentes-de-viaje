'use strict';

document.addEventListener('DOMContentLoaded', () => {
  const config = {
    AOS: {
      duration: 800,
      once: true,
      offset: 120,
      disable: window.matchMedia('(prefers-reduced-motion: reduce)').matches
    },
    formSelector: '#contactForm',
    messageTimeout: 5000
  };

  // Inicialización controlada
  function init() {
    try {
      initializeAOS();
      setupSmoothScrolling();
      setupFormValidation();
      setupAccessibility();
    } catch (error) {
      console.error('Error de inicialización:', error);
    }
  }

  function initializeAOS() {
    if (typeof AOS !== 'undefined') {
      AOS.init(config.AOS);
    } else {
      console.warn('AOS no está cargado');
    }
  }

  function setupSmoothScrolling() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
      anchor.addEventListener('click', function(e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
          target.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
          });
        }
      });
    });
  }

  function setupFormValidation() {
    const form = document.querySelector(config.formSelector);
    if (!form) return;

    form.addEventListener('submit', async (e) => {
      e.preventDefault();
      const formData = new FormData(form);
      
      try {
        // Aquí iría la llamada a tu backend
        await fetch(form.action, {
          method: 'POST',
          body: formData
        });
        
        showFormMessage('Mensaje enviado correctamente', 'success');
        form.reset();
      } catch (error) {
        showFormMessage('Error al enviar el mensaje', 'error');
      }
    });
  }

  function showFormMessage(message, type) {
    const messageElement = document.getElementById('formMessage');
    messageElement.textContent = message;
    messageElement.className = `form-message ${type}`;
    
    setTimeout(() => {
      messageElement.textContent = '';
      messageElement.className = 'form-message';
    }, config.messageTimeout);
  }

  function setupAccessibility() {
    // Mejoras de accesibilidad
    document.querySelectorAll('img').forEach(img => {
      if (!img.alt) img.alt = 'Imagen decorativa';
    });
  }

  // Iniciar la aplicación
  init();
});
