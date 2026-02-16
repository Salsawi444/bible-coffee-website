/* --- 1. GLOBAL DATABASE --- */
const db = {
    "Ethiopia": { 
        "Addis Ababa": ["Bole Atlas (The Cup)", "Mexico", "Piassa", "Megenagna", "CMC", "Old Airport"], 
        "Hawassa": ["Lake Side Coffee"] 
    },
    "Kenya": { 
        "Nairobi": ["Kilimani District", "Westlands"],
        "Mombasa": ["City Center"]
    },
    "USA": { 
        "Dallas": ["Downtown", "Plano"], 
        "Houston": ["Galleria Area"],
        "New York": ["Brooklyn", "Manhattan"]
    },
    "UK": { 
        "London": ["Central London", "Canary Wharf"],
        "Manchester": ["Northern Quarter"]
    },
    "South Africa": { 
        "Johannesburg": ["Sandton"], 
        "Cape Town": ["City Bowl"] 
    },
    "Sweden": { "Stockholm": ["Norrmalm"] },
    "Norway": { "Oslo": ["Sentrum"] },
    "Germany": { "Berlin": ["Mitte"] },
    "Uganda": { "Kampala": ["Central District"] },
    "Rwanda": { "Kigali": ["Nyarugenge"] }
};

/* --- 2. NAVIGATION LOGIC --- */
function showSection(id, btn) {
    // List of all main section IDs
    const sections = ['home-wrapper', 'magazine', 'merch', 'sermon', 'events', 'support', 'join'];
    
    // Hide everything first
    sections.forEach(sectionId => {
        const el = document.getElementById(sectionId);
        if (el) {
            el.style.display = 'none';
            el.classList.add('hidden');
        }
    });

    // Show the specific section
    if (id === 'home') {
        const home = document.getElementById('home-wrapper');
        if (home) {
            home.style.display = 'block';
            home.classList.remove('hidden');
        }
    } else {
        const target = document.getElementById(id);
        if (target) {
            target.style.display = 'block';
            target.classList.remove('hidden');
        }
    }

    // UI Updates: Active Button State
    document.querySelectorAll('.nav-links button').forEach(b => b.classList.remove('active'));
    if (btn) btn.classList.add('active');

    // Close Mobile Menu if open
    const navLinks = document.getElementById('nav-links');
    if (navLinks) navLinks.classList.remove('active-menu');

    window.scrollTo({ top: 0, behavior: 'smooth' });
}

/* --- 3. FORM LOGIC --- */
function updateCities() {
    const country = document.getElementById('country').value;
    const citySelect = document.getElementById('city');
    const locSelect = document.getElementById('location');
    
    citySelect.innerHTML = '<option value="" disabled selected>Select City</option>';
    locSelect.innerHTML = '<option value="" disabled selected>Select Location</option>';
    
    if (db[country]) {
        Object.keys(db[country]).forEach(city => {
            let opt = document.createElement('option');
            opt.value = city;
            opt.textContent = city;
            citySelect.appendChild(opt);
        });
    }
}

function updateLocations() {
    const country = document.getElementById('country').value;
    const city = document.getElementById('city').value;
    const locSelect = document.getElementById('location');
    
    locSelect.innerHTML = '<option value="" disabled selected>Select Location</option>';
    
    if (db[country] && db[country][city]) {
        db[country][city].forEach(loc => {
            let opt = document.createElement('option');
            opt.value = loc;
            opt.textContent = loc;
            locSelect.appendChild(opt);
        });
    }
}

/* --- 4. INITIALIZATION --- */
document.addEventListener('DOMContentLoaded', () => {
    // Mobile Menu Toggle logic
    const menuBtn = document.getElementById('menu-toggle');
    const navLinks = document.getElementById('nav-links');
    
    if (menuBtn && navLinks) {
        menuBtn.addEventListener('click', () => {
            navLinks.classList.toggle('active-menu');
        });
    }
    
    // Lucide Icons
    if (window.lucide) {
        lucide.createIcons();
    }
});
