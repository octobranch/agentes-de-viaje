// Manejo de reCAPTCHA v3
document.addEventListener('DOMContentLoaded', () => {
    if(document.querySelector('.contact-form')) {
        // Generar token inicial
        grecaptcha.ready(() => {
            grecaptcha.execute('TU_SITE_KEY', { action: 'contacto' })
                .then(token => {
                    document.getElementById('recaptchaResponse').value = token;
                });
        });

        // Renovar token cada 2 minutos
        setInterval(() => {
            grecaptcha.execute('TU_SITE_KEY', { action: 'contacto' })
                .then(token => {
                    document.getElementById('recaptchaResponse').value = token;
                });
        }, 120000);
    }
});
