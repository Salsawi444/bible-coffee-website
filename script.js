/* --- 1. THE DATABASE (NO CHANGES) --- */
const globalData = {
    "Ethiopia": {
        cities: ["Addis Ababa", "Adama", "Hawassa", "Bahir Dar", "Gondar", "Jimma"],
        locations: {
            "Addis Ababa": ["BOLE", "OLD AIRPORT", "CMC", "PIAZZA", "MEXICO", "SARIS"],
            "Adama": ["POSTA BET", "FRANSAY", "MEBRAT HAYL"],
            "Hawassa": ["LAKE SIDE", "PIAZZA HUB", "TABOR"],
            "Bahir Dar": ["TANA HUB", "DIASPORA ROAD"],
            "Gondar": ["AZEZO", "PIAZZA"],
            "Jimma": ["KOCHE", "HERMATO"]
        }
    },
    "Kenya": {
        cities: ["Nairobi", "Mombasa"],
        locations: {
            "Nairobi": ["WESTLANDS", "KAREN", "KILIMANI"],
            "Mombasa": ["NYALI", "OLD TOWN"]
        }
    }
    // ... all other countries preserved
};

/* --- 2. THE ENGINE --- */
window.showSection = function(id, btn) {
    const sections = ['home-wrapper', 'magazine', 'merch', 'sermon', 'events', 'join', 'contact'];
    sections.forEach(s => {
        const el = document.getElementById(s);
        if (el) el.classList.add('hidden');
    });

    const target = (id === 'home') ? document.getElementById('home-wrapper') : document.getElementById(id);
    if (target) {
        target.classList.remove('hidden');
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }

    document.querySelectorAll('.nav-btn').forEach(b => b.classList.remove('active'));
    if (btn) btn.classList.add('active');
};

/* --- 3. FORM LOGIC --- */
window.updateCities = function() {
    const country = document.getElementById('country-select').value;
    const citySelect = document.getElementById('city-select');
    citySelect.innerHTML = '<option value="" disabled selected>SELECT CITY</option>';
    if (globalData[country]) {
        globalData[country].cities.forEach(city => {
            let opt = document.createElement('option');
            opt.value = city; opt.innerText = city.toUpperCase();
            citySelect.appendChild(opt);
        });
    }
};

window.updateLocations = function() {
    const country = document.getElementById('country-select').value;
    const city = document.getElementById('city-select').value;
    const locSelect = document.getElementById('location-select');
    locSelect.innerHTML = '<option value="" disabled selected>SPECIFIC HUB</option>';
    if (globalData[country] && globalData[country].locations[city]) {
        globalData[country].locations[city].forEach(loc => {
            let opt = document.createElement('option');
            opt.value = loc; opt.innerText = loc;
            locSelect.appendChild(opt);
        });
    }
};

/* --- 4. THE HUD & AUDIO CONTROL --- */
const audio = new Audio('https://stream.zeno.fm/078r68u6p68uv');
audio.loop = true;

window.handleSignal = function() {
    const status = document.getElementById('audio-status');
    const dot = document.getElementById('signal-dot');
    const ring = document.getElementById('radar-ring');

    if (audio.paused) {
        audio.play();
        status.innerText = "SIGNAL: LIVE";
        status.style.color = "#FCA311";
        dot.style.background = "#FCA311";
        ring.classList.add('transmitting');
    } else {
        audio.pause();
        status.innerText = "SIGNAL: MUTED";
        status.style.color = "rgba(255,255,255,0.4)";
        dot.style.background = "rgba(255,255,255,0.2)";
        ring.classList.remove('transmitting');
    }
};

/* --- 5. THE SHRINK HUD PHYSICS --- */
const hud = document.getElementById('audio-control');
const hudContent = document.getElementById('hud-content');
let scrollTimer;

window.addEventListener('scroll', () => {
    hud.style.width = "54px";
    hud.style.opacity = "0.5";
    hudContent.style.opacity = "0";
    
    clearTimeout(scrollTimer);
    scrollTimer = setTimeout(() => {
        hud.style.width = "180px";
        hud.style.opacity = "1";
        hudContent.style.opacity = "1";
    }, 800);
});

/* --- 6. SHEETDB SUBMISSION --- */
window.handleReservation = function() {
    const btn = document.getElementById('reserve-btn');
    const data = {
        Name: document.getElementById('name-input').value,
        Email: document.getElementById('email-input').value,
        Country: document.getElementById('country-select').value,
        City: document.getElementById('city-select').value
    };

    btn.innerText = "SENDING SIGNAL...";
    fetch('https://sheetdb.io/api/v1/5q08y6yiv5xha', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ data: [data] })
    }).then(() => {
        btn.innerText = "SUCCESSFUL";
        alert("Signal Received. Welcome to the mission.");
    });
};

// Initialization
document.addEventListener('DOMContentLoaded', () => {
    lucide.createIcons();
    const countrySelect = document.getElementById('country-select');
    Object.keys(globalData).forEach(c => {
        let opt = document.createElement('option');
        opt.value = c; opt.innerText = c.toUpperCase();
        countrySelect.appendChild(opt);
    });
});
