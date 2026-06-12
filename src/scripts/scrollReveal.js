// src/scripts/scrollReveal.js
document.addEventListener('DOMContentLoaded', () => {
  // Podesavamo pravila: element mora biti 15% vidljiv da bi animacija krenula
  const observerOptions = {
    root: null,
    rootMargin: '0px',
    threshold: 0.15 
  };

  const observer = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        // Kada udje u ekran, skidamo klase koje ga drze providnim i spustenim
        entry.target.classList.remove('opacity-0', 'translate-y-10');
        entry.target.classList.add('opacity-100', 'translate-y-0');
        
        // Iskljucujemo posmatranje za ovaj element (animacija se desava samo jednom)
        observer.unobserve(entry.target); 
      }
    });
  }, observerOptions);

  // Nalazimo sve elemente na sajtu koji imaju klasu 'reveal-on-scroll'
  const elements = document.querySelectorAll('.reveal-on-scroll');
  elements.forEach(el => observer.observe(el));
});