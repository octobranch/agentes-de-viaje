document.addEventListener('DOMContentLoaded', () => {
    // Inicialización de AOS con detección de movimiento reducido
    AOS.init({
        duration: 1000,
        once: true,
        mirror: false,
        disable: () => window.matchMedia('(prefers-reduced-motion: reduce)').matches
    });

    // Scroll suave con validación de anclajes
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                e.preventDefault();
                window.scrollTo({
                    top: target.offsetTop - 100,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Efecto 3D en tarjetas con menor impacto en el rendimiento
    const apply3DEffect = (card) => {
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = (e.clientX - rect.left - rect.width / 2) / 15;
            const y = (e.clientY - rect.top - rect.height / 2) / 15;
            card.style.transform = `perspective(1000px) rotateX(${y}deg) rotateY(${-x}deg) scale(1.02)`;
        });
        card.addEventListener('mouseleave', () => {
            card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) scale(1)';
        });
    };
    document.querySelectorAll('.destination-card').forEach(apply3DEffect);

    // Validación mejorada del formulario
    const form = document.querySelector('.contact-form');
    if (form) {
        form.addEventListener('submit', function(e) {
            const email = document.querySelector('[name="email"]');
            const nombre = document.querySelector('[name="nombre"]');
            const mensaje = document.querySelector('[name="mensaje"]');
            
            if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.value)) {
                e.preventDefault();
                alert('Por favor ingresa un email válido');
                return;
            }
            if (nombre.value.trim() === '') {
                e.preventDefault();
                alert('El campo nombre es requerido');
                return;
            }
            if (mensaje.value.trim().length < 20) {
                e.preventDefault();
                alert('El mensaje debe tener al menos 20 caracteres');
                return;
            }
        });
    }

    // Lazy loading de imágenes con mejor eficiencia
    const lazyImages = document.querySelectorAll('img[data-src]');
    const imgObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.removeAttribute('data-src');
                observer.unobserve(img);
            }
        });
    }, { rootMargin: '200px 0px' });
    lazyImages.forEach(img => imgObserver.observe(img));

    // Manejo global de errores en consola
    window.onerror = (message, source, lineno, colno, error) => {
        console.error(`Error: ${message} en ${source}:${lineno}`);
        return true;
    };
});
