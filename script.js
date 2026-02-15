// Initialize Icons
lucide.createIcons();

// 1. GLOBAL NAVIGATION
function showSection(sectionId, btn) {
    const homeWrapper = document.getElementById('home-wrapper');
    const sections = document.querySelectorAll('.section-container');
    
    // Hide all
    sections.forEach(sec => {
        sec.style.display = 'none';
        sec.classList.add('hidden');
    });

    if (sectionId === 'home') {
        homeWrapper.style.display = 'block';
    } else {
        homeWrapper.style.display = 'none';
        const target = document.getElementById(sectionId);
        if (target) {
            target.style.display = 'block';
            target.classList.remove('hidden');
        }
    }

    // Button Color Fix
    document.querySelectorAll('.nav-links button').forEach(b => b.classList.remove('active'));
    if (btn) btn.classList.add('active');

    // Mobile Menu Close
    document.getElementById('nav-links').classList.remove('active');
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

// 2. MOBILE TOGGLE
document.getElementById('menu-toggle').addEventListener('click', () => {
    document.getElementById('nav-links').classList.toggle('active');
});

// 3. FORM LOGIC
const geoData = {
    "Ethiopia": { "Addis Ababa": ["Bole Atlas (The Cup)", "Old Airport"] },
    "Kenya": { "Nairobi": ["Westlands"] }
};

function updateCities() {
    const country = document.getElementById('country').value;
    const citySelect = document.getElementById('city');
    citySelect.innerHTML = '<option value="" disabled selected>Select City</option>';
    if (geoData[country]) {
        Object.keys(geoData[country]).forEach(city => {
            citySelect.innerHTML += `<option value="${city}">${city}</option>`;
        });
    }
}

function updateLocations() {
    const city = document.getElementById('city').value;
    const country = document.getElementById('country').value;
    const locSelect = document.getElementById('location');
    locSelect.innerHTML = '<option value="" disabled selected>Select Spot</option>';
    if (geoData[country][city]) {
        geoData[country][city].forEach(loc => {
            locSelect.innerHTML += `<option value="${loc}">${loc}</option>`;
        });
    }
}

function checkSlots() {
    const badge = document.getElementById('slot-badge');
    badge.classList.remove('hidden');
    const seats = Math.floor(Math.random() * 3) + 1;
    document.getElementById('slot-status-text').innerText = `HURRY! ONLY ${seats} SEATS LEFT`;
}

// Start Home
document.addEventListener('DOMContentLoaded', () => showSection('home'));
