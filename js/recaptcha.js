document.addEventListener('DOMContentLoaded', () => {
    const recaptchaResponse = document.getElementById('recaptchaResponse');
    
    if(recaptchaResponse) {
        const updateRecaptchaToken = () => {
            grecaptcha.ready(() => {
                grecaptcha.execute('TU_SITE_KEY', { action: 'contacto' })
                    .then(token => recaptchaResponse.value = token);
            });
        };

        updateRecaptchaToken();
        setInterval(updateRecaptchaToken, 120000);
    }
});
