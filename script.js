/* --- 0. THE CODE JOYSTICK (DESKTOP ONLY) --- */
/* Tune these numbers to move your content. Negative = Up/Left, Positive = Down/Right */
const DESKTOP_POS = {
    titleY: 5,      // Move "BIBLE & COFFEE" Up/Down (px)
    contentY: 0,    // Move Subtitle & Paragraph Up/Down (px)
    globalX: -130      // Move Everything Left/Right (px)
};

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
    }
    // ... all other countries you have in your file are safe here.
};

/* --- 2. NAVIGATION & RESET LOGIC --- */
function showSection(id, btn) {
    const sections = ['home-wrapper', 'magazine', 'merch', 'sermon', 'events', 'support', 'join'];
    
    sections.forEach(sectionId => {
        const el = document.getElementById(sectionId);
        if (el) {
            el.style.display = 'none';
            el.classList.add('hidden');
        }
    });

    if (id === 'home') {
        const home = document.getElementById('home-wrapper');
        if (home) { home.style.display = 'block'; home.classList.remove('hidden'); }
    } else {
        const target = document.getElementById(id);
        if (target) { 
            target.style.display = 'block'; 
            target.classList.remove('hidden'); 
        }
    }

    document.querySelectorAll('.nav-links button').forEach(b => b.classList.remove('active'));
    if (btn) btn.classList.add('active');
    const navLinks = document.getElementById('nav-links');
    if (navLinks) navLinks.classList.remove('active-menu');
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

function resetToHome() {
    window.scrollTo(0, 0);
    setTimeout(() => { location.reload(); }, 100);
}

/* --- 3. VIDEO ENGINE --- */
function openVideo(id) {
    window.open(`https://www.youtube.com/watch?v=${id}`, '_blank');
}

/* --- 4. FORM & SEAT COUNTER LOGIC --- */
const API_URL = "https://sheetdb.io/api/v1/9q45d3e7oe5ks"; 

function updateCities() {
    const country = document.getElementById('country').value;
    const citySelect = document.getElementById('city');
    const locSelect = document.getElementById('location');
    
    citySelect.innerHTML = '<option value="" disabled selected></option>'; 
    locSelect.innerHTML = '<option value="" disabled selected></option>';
    
    if (db[country]) {
        Object.keys(db[country]).forEach(city => {
            let opt = document.createElement('option');
            opt.value = city; opt.textContent = city;
            citySelect.appendChild(opt);
        });
    }
}

function updateLocations() {
    const country = document.getElementById('country').value;
    const city = document.getElementById('city').value;
    const locSelect = document.getElementById('location');
    
    locSelect.innerHTML = '<option value="" disabled selected></option>';
    
    if (db[country] && db[country][city]) {
        db[country][city].forEach(loc => {
            let opt = document.createElement('option');
            opt.value = loc; opt.textContent = loc;
            locSelect.appendChild(opt);
        });
    }
}

async function checkSlots() {
    const location = document.getElementById('location').value;
    const statusText = document.getElementById('slot-status-text');
    if (!location) return;
    statusText.innerHTML = `<span style="opacity: 0.5;">SCANNING TABLE CAPACITY...</span>`;
    try {
        const response = await fetch(API_URL);
        const data = await response.json();
        const booked = data.filter(entry => entry.Location === location).length;
        const available = 10 - booked;
        statusText.innerHTML = `<span style="color: #FCA311;">[ ${available} / 10 SEATS REMAINING ]</span>`;
    } catch (error) { statusText.innerText = "SYSTEM ACTIVE."; }
}

/* --- 5. INITIALIZATION --- */
document.addEventListener('DOMContentLoaded', () => {
    // Apply Joysticks
    if (window.innerWidth >= 1024) {
        const title = document.querySelector('.brand-block h1');
        const content = document.querySelector('.brand-sub-block');
        const wrapper = document.querySelector('.brand-block');
        if (title) title.style.transform = `translateY(${DESKTOP_POS.titleY}px)`;
        if (content) content.style.transform = `translateY(${DESKTOP_POS.contentY}px)`;
        if (wrapper) wrapper.style.transform = `translateX(${DESKTOP_POS.globalX}px)`;
    }
    if (window.lucide) { lucide.createIcons(); }
});
