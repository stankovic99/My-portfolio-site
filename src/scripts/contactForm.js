// src/scripts/contactForm.js
// Šalje kontakt formu na Web3Forms preko fetch-a, bez napuštanja stranice.
// Astro učitava skriptu kao modul (posle parsiranja HTML-a), pa DOM već postoji.
const form = document.getElementById('contact-form');

if (form) {
  const emailInput = form.querySelector('#email');
  const submitBtn = form.querySelector('button[type="submit"]');
  const btnText = submitBtn.querySelector('span');
  const successMsg = document.getElementById('success-message');
  const errorMsg = document.getElementById('form-error');
  const defaultBtnText = btnText.textContent;

  // Stroža provera od type="email" (traži i tačku u domenu)
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  const showError = (text) => {
    errorMsg.textContent = text;
    errorMsg.classList.remove('hidden');
  };

  // Poruka o uspehu prekriva formu 5 sekundi
  const showSuccess = () => {
    successMsg.classList.replace('hidden', 'flex');
    setTimeout(() => successMsg.classList.replace('flex', 'hidden'), 5000);
  };

  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    errorMsg.classList.add('hidden');

    if (!emailRegex.test(emailInput.value.trim())) {
      showError('Please enter a valid email address (e.g. name@domain.com).');
      emailInput.focus();
      return;
    }

    btnText.textContent = 'Sending...';
    submitBtn.disabled = true;

    try {
      const response = await fetch(form.action, {
        method: 'POST',
        body: new FormData(form),
        headers: { Accept: 'application/json' },
      });
      if (!response.ok) throw new Error(`Web3Forms responded with ${response.status}`);

      form.reset();
      showSuccess();
    } catch {
      // Greška servera ili mreže: poruka ostaje u poljima da može ponovo da se pošalje
      showError('The message could not be sent. Please try again, or email me directly.');
    } finally {
      btnText.textContent = defaultBtnText;
      submitBtn.disabled = false;
    }
  });
}
