/* --- 1. PRESERVED GLOBAL DATABASE --- */
const globalData = {
    "Ethiopia": {
        cities: ["Addis Ababa", "Adama", "Hawassa", "Bahir Dar"],
        locations: {
            "Addis Ababa": ["BOLE HUB", "PIAZZA HUB", "CMC HUB"],
            "Adama": ["POSTA BET"],
            "Hawassa": ["LAKE SIDE"]
        }
    },
    "Kenya": {
        cities: ["Nairobi"],
        locations: { "Nairobi": ["WESTLANDS", "KAREN"] }
    }
    // Add other countries as per your alpha code
};

/* --- 2. LUXURY NAVIGATION --- */
window.showSection = function(id, btn) {
    const sections = ['home-wrapper', 'magazine', 'merch', 'sermon', 'events', 'support', 'join', 'contact'];
    sections.forEach(s => {
        const el = document.getElementById(s);
        if (el) el.style.display = 'none';
    });

    const target = id === 'home' ? document.getElementById('home-wrapper') : document.getElementById(id);
    if (target) {
        target.style.display = 'block';
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }

    // Update Nav Buttons
    document.querySelectorAll('.nav-links button').forEach(b => b.classList.remove('active', 'text-gold'));
    if (btn) btn.classList.add('active', 'text-[#C5A059]');
};

/* --- 3. THE JOIN LOGIC (UNTOUCHED ENGINE) --- */
window.updateCities = function() {
    const country = document.getElementById('country-select').value;
    const citySelect = document.getElementById('city-select');
    citySelect.innerHTML = '<option value="" disabled selected>SELECT CITY</option>';
    
    if (globalData[country]) {
        globalData[country].cities.forEach(city => {
            let opt = document.createElement('option');
            opt.value = city;
            opt.innerText = city.toUpperCase();
            citySelect.appendChild(opt);
        });
    }
};

window.updateLocations = function() {
    const country = document.getElementById('country-select').value;
    const city = document.getElementById('city-select').value;
    const locSelect = document.getElementById('location-select');
    locSelect.innerHTML = '<option value="" disabled selected>SELECT HUB</option>';

    if (globalData[country] && globalData[country].locations[city]) {
        globalData[country].locations[city].forEach(loc => {
            let opt = document.createElement('option');
            opt.value = loc;
            opt.innerText = loc;
            locSelect.appendChild(opt);
        });
    }
};

/* --- 4. THE HUD (AUDIO) LOGIC --- */
const audio = new Audio('https://www.soundjay.com/communication/radio-static-01.mp3');
audio.loop = true;

window.handleSignal = function() {
    const status = document.getElementById('audio-status');
    if (audio.paused) {
        audio.play();
        status.innerText = "SIGNAL: LIVE";
        status.style.color = "#C5A059";
    } else {
        audio.pause();
        status.innerText = "SIGNAL: MUTED";
        status.style.color = "rgba(255,255,255,0.4)";
    }
};

// INITIALIZE
document.addEventListener('DOMContentLoaded', () => {
    lucide.createIcons();
    const countrySelect = document.getElementById('country-select');
    Object.keys(globalData).forEach(c => {
        let opt = document.createElement('option');
        opt.value = c;
        opt.innerText = c.toUpperCase();
        countrySelect.appendChild(opt);
    });
});
