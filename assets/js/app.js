document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('distributorForm');

    if (form) {
        form.addEventListener('submit', (e) => {
            e.preventDefault();

            const myForm = e.target;
            const formData = new FormData(myForm);

            // Add text to button to indicate loading
            const btn = myForm.querySelector('button[type="submit"]');
            const originalText = btn.innerText;
            btn.innerText = 'Enviando...';
            btn.disabled = true;

            // START CHANGE: Handle local testing (file:// protocol)
            if (window.location.protocol === 'file:') {
                console.log('Local testing detected. Simulating submission...');
                setTimeout(() => {
                    // Redirect to Google Calendar
                    window.location.href = 'https://calendar.google.com/';
                }, 1000);
                return;
            }
            // END CHANGE

            fetch('/', {
                method: 'POST',
                headers: { "Content-Type": "application/x-www-form-urlencoded" },
                body: new URLSearchParams(formData).toString(),
            })
                .then(() => {
                    // Redirection on success to Google Calendar
                    window.location.href = 'https://calendar.google.com/';
                })
                .catch((error) => {
                    console.error('Error:', error);
                    // Even if there is an error (e.g. network), we try to redirect so the user can still book
                    alert('Redirigiendo a la agenda...');
                    window.location.href = 'https://calendar.google.com/';
                });
        });
    }
});
