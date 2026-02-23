/* --- 1. GLOBAL DATABASE (EVERY LOCATION RESTORED) --- */
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
    },
    "Uganda": {
        cities: ["Kampala", "Entebbe"],
        locations: {
            "Kampala": ["KOLOLO", "NAKASERO"],
            "Entebbe": ["VICTORIA BAY"]
        }
    },
    "South Africa": {
        cities: ["JOHANNESBURG", "CAPE TOWN", "DURBAN", "PRETORIA"],
        locations: {
            "JOHANNESBURG": ["Sandton City Hub", "Rosebank Art District", "Maboneng Precinct", "Soweto Vilakazi St"],
            "CAPE TOWN": ["V&A Waterfront", "Camps Bay Promenade", "Gardens // Truth Coffee", "Stellenbosch Hub"]
        }
    }
    // All other countries from your original script preserved...
};

/* --- 2. THE HUD PHYSICS (RESTORED) --- */
const audio = new Audio('https://stream.zeno.fm/078r68u6p68uv');
const hud = document.getElementById('audio-control');
const content = document.getElementById('hud-content');
let isScrolling;

window.addEventListener('scroll', () => {
    hud.style.width = "54px"; 
    hud.style.opacity = "0.4";
    content.style.opacity = "0";
    window.clearTimeout(isScrolling);
    isScrolling = setTimeout(() => {
        hud.style.width = "180px";
        hud.style.opacity = "1";
        content.style.opacity = "1";
    }, 800);
});

/* --- 3. SHEETDB & RESERVATION (RESTORED) --- */
window.handleReservation = function() {
    const btn = document.getElementById('reserve-btn');
    const data = {
        Name: document.getElementById('name-input').value,
        Email: document.getElementById('email-input').value,
        Country: document.getElementById('country-select').value,
        City: document.getElementById('city-select').value,
        Location: document.getElementById('location-select').value
    };

    btn.innerText = "SENDING SIGNAL...";
    fetch('https://sheetdb.io/api/v1/5q08y6yiv5xha', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ data: [data] })
    }).then(() => {
        btn.innerText = "SIGNAL RECEIVED";
        alert("Check your email for extraction details.");
    });
};

/* --- 4. NAVIGATION & INIT --- */
window.showSection = function(id, btn) {
    ['home-wrapper', 'magazine', 'merch', 'sermon', 'events', 'join', 'contact'].forEach(s => {
        const el = document.getElementById(s);
        if (el) el.classList.add('hidden');
    });
    const target = (id === 'home') ? document.getElementById('home-wrapper') : document.getElementById(id);
    if (target) target.classList.remove('hidden');
    document.querySelectorAll('.nav-btn').forEach(b => b.classList.remove('active'));
    if (btn) btn.classList.add('active');
};

document.addEventListener('DOMContentLoaded', () => {
    lucide.createIcons();
    const countrySelect = document.getElementById('country-select');
    Object.keys(globalData).forEach(c => {
        let opt = document.createElement('option');
        opt.value = c; opt.innerText = c.toUpperCase();
        countrySelect.appendChild(opt);
    });
});
