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
                    top: target.offsetTop - 100, // Ajuste para asegurar que el contenido esté bien visible
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

    // Validación mejorada del formulario con retroalimentación visual
    const form = document.querySelector('.contact-form');
    if (form) {
        form.addEventListener('submit', function(e) {
            const email = document.querySelector('[name="email"]');
            const nombre = document.querySelector('[name="nombre"]');
            const mensaje = document.querySelector('[name="mensaje"]');
            let isValid = true;

            // Validación del email
            if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.value)) {
                e.preventDefault();
                email.style.border = '2px solid red';
                alert('Por favor ingresa un email válido');
                isValid = false;
            } else {
                email.style.border = '1px solid #ddd';
            }

            // Validación del nombre
            if (nombre.value.trim() === '') {
                e.preventDefault();
                nombre.style.border = '2px solid red';
                alert('El campo nombre es requerido');
                isValid = false;
            } else {
                nombre.style.border = '1px solid #ddd';
            }

            // Validación del mensaje
            if (mensaje.value.trim().length < 20) {
                e.preventDefault();
                mensaje.style.border = '2px solid red';
                alert('El mensaje debe tener al menos 20 caracteres');
                isValid = false;
            } else {
                mensaje.style.border = '1px solid #ddd';
            }

            return isValid;
        });
    }

    // Lazy loading de imágenes con mejor eficiencia y soporte a imágenes responsive
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

    // Manejo global de errores en consola con mayor contexto
    window.onerror = (message, source, lineno, colno, error) => {
        console.error(`Error detectado: ${message}\nUbicación: ${source}:${lineno}:${colno}\nError: ${error}`);
        return true; // Previene el comportamiento por defecto
    };

    // Función de alerta discreta para mostrar mensajes importantes sin interrumpir
    const showAlert = (message) => {
        const alertBox = document.createElement('div');
        alertBox.classList.add('custom-alert');
        alertBox.textContent = message;
        document.body.appendChild(alertBox);
        setTimeout(() => {
            alertBox.style.opacity = '0';
            setTimeout(() => alertBox.remove(), 500);
        }, 3000);
    };

    // Muestra una alerta de bienvenida o cualquier mensaje personalizado
    showAlert('Bienvenido a Harmonia Tours, ¡disfruta de una experiencia única!');
});
