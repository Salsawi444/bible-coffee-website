const API_URL = 'https://sheetdb.io/api/v1/9q45d3e7oe5ks';

function showSection(id, btn) {
    const sections = ['magazine', 'merch', 'sermon', 'events', 'support', 'join'];
    const homeWrapper = document.getElementById('home-wrapper');
    
    // Hide all standalone sections
    sections.forEach(sId => {
        const el = document.getElementById(sId);
        if (el) el.classList.add('hidden');
    });

    if (id === 'home') {
        homeWrapper.classList.remove('hidden');
        window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
        homeWrapper.classList.add('hidden');
        const target = document.getElementById(id);
        if (target) target.classList.remove('hidden');
    }

    // Active Button State
    document.querySelectorAll('.nav-links button').forEach(b => b.classList.remove('active'));
    if (btn) btn.classList.add('active');

    // Mobile Menu Close
    const navLinks = document.getElementById('nav-links');
    if (navLinks.classList.contains('active-menu')) {
        navLinks.classList.remove('active-menu');
        const icon = document.querySelector('#menu-toggle i');
        icon.setAttribute('data-lucide', 'menu');
        lucide.createIcons();
    }
}

// Initializer
document.addEventListener('DOMContentLoaded', () => {
    // Ticker Guard: Ensures smooth infinite scroll
    const ticker = document.querySelector('.ticker');
    if(ticker) {
        const clone = ticker.innerHTML;
        ticker.innerHTML += clone; // Doubling items for seamless loop
    }
});

/* --- Keep your existing Database (db), updateCities, updateLocations, and checkSlots functions here --- */
