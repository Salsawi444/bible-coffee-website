/* --- CONFIGURATION & DATABASE --- */
const API_URL = 'https://sheetdb.io/api/v1/9q45d3e7oe5ks';

const globalData = {
    "Ethiopia": {
        cities: ["Addis Ababa", "Nazreth", "Hawassa", "Bahir Dar", "Dire Dawa", "Gondar", "Jimma", "Mekelle", "Dessie"],
        locations: { "Addis Ababa": ["Bole Atlas (The Cup)", "Kazanchis", "Old Airport", "Sarbet", "CMC", "Piyassa"] }
    },
    "Kenya": {
        cities: ["Nairobi", "Mombasa", "Kisumu", "Nakuru", "Eldoret"],
        locations: { "Nairobi": ["Westlands Hub", "Karen Table", "Kilimani Coffee Shop", "CBD Central"] }
    },
    // ... Rest of your mighty data vault is preserved exactly ...
};

/* --- REVEAL ON SCROLL ENGINE --- */
const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('active');
        }
    });
}, { threshold: 0.1 });

/* --- NAVIGATION LOGIC --- */
function showSection(id, btn) {
    const sections = ['home-wrapper', 'magazine', 'merch', 'sermon', 'events', 'support', 'join'];
    sections.forEach(s => {
        const el = document.getElementById(s);
        if (el) { el.style.setProperty('display', 'none', 'important'); el.classList.add('hidden'); }
    });

    if (id === 'home') {
        document.getElementById('home-wrapper').style.setProperty('display', 'block', 'important');
        document.getElementById('home-wrapper').classList.remove('hidden');
        document.querySelector('.hero-marquee').style.display = 'block';
    } else {
        const target = document.getElementById(id);
        if (target) { target.style.setProperty('display', 'block', 'important'); target.classList.remove('hidden'); }
        document.querySelector('.hero-marquee').style.display = 'none';
    }

    document.querySelectorAll('.nav-links button').forEach(b => b.classList.remove('active'));
    if (btn) btn.classList.add('active');
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

/* --- INITIALIZE --- */
document.addEventListener('DOMContentLoaded', () => {
    if(window.lucide) lucide.createIcons();
    
    // Start Reveal Engine
    document.querySelectorAll('.reveal').forEach(el => revealObserver.observe(el));

    // Fill Country List
    const countrySelect = document.getElementById('country');
    if(countrySelect) {
        Object.keys(globalData).sort().forEach(c => countrySelect.add(new Option(c, c)));
    }
});

// Your existing updateCities, updateLocations, and form submission logic follows exactly as in your Platinum file...
