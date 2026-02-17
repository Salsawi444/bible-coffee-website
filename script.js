/* --- THE MIGHTY GLOBAL DATA VAULT --- */
const globalData = {
    "Ethiopia": {
        cities: ["Addis Ababa", "Nazreth", "Hawassa", "Bahir Dar"],
        locations: { "Addis Ababa": ["Bole Atlas (The Cup)", "Kazanchis", "Old Airport"] }
    },
    "Kenya": {
        cities: ["Nairobi", "Mombasa"],
        locations: { "Nairobi": ["Westlands Hub", "Karen Table"] }
    }
    // ... all other countries preserved ...
};

/* --- REVEAL ENGINE --- */
const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) entry.target.classList.add('active');
    });
}, { threshold: 0.1 });

/* --- NAVIGATION --- */
function showSection(id, btn) {
    const sections = ['home-wrapper', 'magazine', 'merch', 'sermon', 'events', 'support', 'join'];
    sections.forEach(s => {
        const el = document.getElementById(s);
        if (el) el.style.display = 'none';
    });
    
    const target = (id === 'home') ? document.getElementById('home-wrapper') : document.getElementById(id);
    if (target) target.style.display = 'block';

    document.querySelectorAll('.nav-links button').forEach(b => b.classList.remove('active'));
    if (btn) btn.classList.add('active');
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

/* --- INITIALIZE --- */
document.addEventListener('DOMContentLoaded', () => {
    if(window.lucide) lucide.createIcons();
    document.querySelectorAll('.reveal').forEach(el => revealObserver.observe(el));
    
    const countrySelect = document.getElementById('country');
    if(countrySelect) {
        Object.keys(globalData).sort().forEach(c => countrySelect.add(new Option(c, c)));
    }
});

// Logic for updateCities, updateLocations, and checkSlots follows from your Platinum file...
