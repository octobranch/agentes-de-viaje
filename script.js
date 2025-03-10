// script.js - Versión final
'use strict';

document.addEventListener('DOMContentLoaded', () => {
    // 1. Inicialización de AOS
    AOS.init({
        duration: 1000,
        once: true,
        mirror: false,
        disable: window.matchMedia('(prefers-reduced-motion: reduce)').matches
    });

    // 2. Scroll suave mejorado
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if(target) {
                window.scrollTo({
                    top: target.offsetTop - 100,
                    behavior: 'smooth'
                });
            }
        });
    });

    // 3. Efectos 3D en tarjetas
    document.querySelectorAll('.destination-card').forEach(card => {
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            card.style.transform = `
                perspective(1000px)
                rotateX(${(y - rect.height/2) / 15}deg)
                rotateY(${-(x - rect.width/2) / 15}deg)
                scale(1.02)
            `;
        });

        card.addEventListener('mouseleave', () => {
            card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) scale(1)';
        });
    });

    // 4. Validación de formulario en tiempo real
    const form = document.querySelector('.contact-form');
    if(form) {
        form.addEventListener('submit', function(e) {
            const email = document.querySelector('[name="email"]').value;
            const nombre = document.querySelector('[name="nombre"]').value;
            
            // Validación básica de email
            if(!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
                e.preventDefault();
                alert('Por favor ingresa un email válido');
                return;
            }
            
            // Validación de nombre
            if(nombre.trim() === '') {
                e.preventDefault();
                alert('El campo nombre es requerido');
                return;
            }
            
            // Validación de mensaje
            const mensaje = document.querySelector('[name="mensaje"]').value;
            if(mensaje.trim().length < 20) {
                e.preventDefault();
                alert('El mensaje debe tener al menos 20 caracteres');
                return;
            }
        });
    }

    // 5. Carga progresiva de imágenes
    const lazyLoad = () => {
        const lazyImages = document.querySelectorAll('img[data-src]');
        
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if(entry.isIntersecting) {
                    const img = entry.target;
                    img.src = img.dataset.src;
                    img.removeAttribute('data-src');
                    observer.unobserve(img);
                }
            });
        }, {
            rootMargin: '200px 0px'
        });

        lazyImages.forEach(img => observer.observe(img));
    };
    
    lazyLoad();
});

// 6. Manejo de errores global
window.onerror = function(message, source, lineno, colno, error) {
    console.error(`Error: ${message} en ${source}:${lineno}`);
    return true;
};
