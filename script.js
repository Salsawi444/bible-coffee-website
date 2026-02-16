/* --- 1. GLOBAL DATABASE --- */
/* --- 1. GLOBAL DATABASE (WORLD TOUR EDITION) --- */
const db = {
    "Ethiopia": { 
        "Addis Ababa": ["Bole Atlas (The Cup)", "Mexico", "Piassa", "Megenagna", "CMC", "Old Airport"], 
        "Hawassa": ["Lake Side Coffee"], "Adama": ["City Center"], "Bahir Dar": ["Lake Front"]
    },
    "Kenya": { 
        "Nairobi": ["Kilimani District", "Westlands", "Karen", "Gigiri"],
        "Mombasa": ["Nyali", "Bamburi"], "Kisumu": ["Milimani"]
    },
    "Nigeria": {
        "Lagos": ["Victoria Island", "Ikeja", "Lekki Phase 1"],
        "Abuja": ["Maitama", "Wuse 2"], "Port Harcourt": ["GRA"]
    },
    "South Africa": { 
        "Johannesburg": ["Sandton", "Rosebank", "Maboneng"], 
        "Cape Town": ["City Bowl", "Sea Point", "Stellenbosch"], "Durban": ["Umhlanga"]
    },
    "USA": { 
        "Dallas": ["Downtown", "Plano", "Frisco"], "Houston": ["Galleria Area", "Sugar Land"],
        "New York": ["Brooklyn", "Manhattan", "Queens"], "Los Angeles": ["Santa Monica", "Pasadena", "Silver Lake"],
        "Washington DC": ["Georgetown"], "Atlanta": ["Buckhead"], "Chicago": ["Lincoln Park"],
        "Miami": ["Brickell"], "Seattle": ["Capitol Hill"]
    },
    "UK": { 
        "London": ["Central London", "Canary Wharf", "Shoreditch", "Soho"],
        "Manchester": ["Northern Quarter"], "Birmingham": ["City Centre"], "Edinburgh": ["Old Town"]
    },
    "UAE": {
        "Dubai": ["Downtown Dubai", "Marina", "Jumeirah"], "Abu Dhabi": ["Corniche", "Yas Island"]
    },
    "Canada": { 
        "Toronto": ["Downtown", "Scarborough", "Liberty Village"], "Vancouver": ["Gastown", "Kitsilano"], "Montreal": ["Plateau"]
    },
    "Australia": { 
        "Sydney": ["CBD", "Surry Hills", "Bondi"], "Melbourne": ["Southbank", "Fitzroy"], "Brisbane": ["Fortitude Valley"]
    },
    "Germany": { "Berlin": ["Mitte", "Kreuzberg"], "Frankfurt": ["Innenstadt"], "Munich": ["Altstadt"], "Hamburg": ["Altona"] },
    "France": { "Paris": ["Le Marais", "Montmartre"], "Lyon": ["Presqu'île"] },
    "Italy": { "Rome": ["Trastevere"], "Milan": ["Brera"] },
    "Brazil": { "Rio de Janeiro": ["Ipanema"], "São Paulo": ["Jardins"] },
    "Japan": { "Tokyo": ["Shibuya", "Shinjuku"], "Osaka": ["Umeda"] },
    "South Korea": { "Seoul": ["Gangnam", "Itaewon"] },
    "China": { "Hong Kong": ["Central"], "Shanghai": ["Pudong"] },
    "Ghana": { "Accra": ["East Legon", "Osu"], "Kumasi": ["Adum"] },
    "Uganda": { "Kampala": ["Central District", "Kololo", "Entebbe"] },
    "Rwanda": { "Kigali": ["Nyarugenge", "Kimihurura", "Gacuriro"] },
    "Egypt": { "Cairo": ["Zamalek", "Maadi"], "Alexandria": ["Corniche"] },
    "Israel": { "Tel Aviv": ["Rothschild Blvd"], "Jerusalem": ["City Center"] }
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
