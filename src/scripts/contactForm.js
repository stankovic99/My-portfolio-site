document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('contact-form');
    
    if(form) {
        form.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // 1. Bolji, pouzdaniji Regex za klijentsku proveru
            const emailInput = document.getElementById('email').value;
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            
            if (!emailRegex.test(emailInput)) {
                alert('Please enter a valid email address (e.g. name@domain.com)');
                return;
            }
    
            // 2. Slanje podataka
            const formData = new FormData(form);
            const submitBtn = form.querySelector('button[type="submit"]');
            const btnText = submitBtn.querySelector('span');
            const successMsg = document.getElementById('success-message');
    
            const originalBtnText = btnText.innerHTML;
            btnText.innerHTML = 'Sending...';
            submitBtn.disabled = true;
    
            fetch(form.action, {
                method: form.method,
                body: formData,
                headers: {
                    'Accept': 'application/json'
                }
            })
            .then(response => {
                if (response.ok) {
                    form.reset();
                    successMsg.classList.remove('hidden');
                    
                    setTimeout(() => {
                        successMsg.classList.add('hidden');
                    }, 5000);
                } else {
                    alert('An error occurred while sending the message.');
                }
            })
            .catch(error => {
                alert('A network error occurred. Please check your connection.');
            })
            .finally(() => {
                btnText.innerHTML = originalBtnText;
                submitBtn.disabled = false;
            });
        });
    }
});