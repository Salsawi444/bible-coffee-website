/* THE PLATINUM, THE MIGHTY LOGIC ENGINE */

lucide.createIcons();

// 1. THE WORLD ENGINE (GLOBAL DATA)
const worldData = {
    "Ethiopia": {
        "Addis Ababa": ["The Cup (Bole Atlas)", "Tomoca (Piassa)", "Galani Coffee (Summit)", "Sarbet (Old Vic)"],
        "Hawassa": ["Ker-Awud International", "Haile Resort"]
    },
    "Kenya": { "Nairobi": ["CJ's (Kilimani)", "Java House (Westlands)", "Artcaffe (Karen)"] },
    "USA": { "Dallas": ["Ascension (Design District)", "Method Coffee"], "NYC": ["Devocion"] },
    "UAE": { "Dubai": ["% Arabica (Dubai Mall)", "The Sum of Us"] }
};

// 2. NAVIGATION SYSTEM
function showSection(id, btn) {
    const home = document.getElementById('home-wrapper');
    if(home) home.style.display = (id === 'home') ? 'block' : 'none';
    
    document.querySelectorAll('.section-container').forEach(s => s.classList.add('hidden'));
    if(id !== 'home') {
        const target = document.getElementById(id);
        if(target) target.classList.remove('hidden');
    }

    document.querySelectorAll('.nav-links button').forEach(b => b.classList.remove('active'));
    if(btn) btn.classList.add('active');
    window.scrollTo({top: 0, behavior: 'smooth'});
}

// 3. JOYSTICK PROTOCOLS (FORM)
window.onload = () => {
    const countrySel = document.getElementById('country');
    if(countrySel) {
        Object.keys(worldData).sort().forEach(c => countrySel.add(new Option(c.toUpperCase(), c)));
    }
};

function updateCities() {
    const country = document.getElementById('country').value;
    const citySel = document.getElementById('city');
    citySel.innerHTML = '<option value="" disabled selected>CITY</option>';
    if(worldData[country]) {
        Object.keys(worldData[country]).forEach(c => citySel.add(new Option(c.toUpperCase(), c)));
    }
}

function updateLocations() {
    const country = document.getElementById('country').value;
    const city = document.getElementById('city').value;
    const locSel = document.getElementById('location');
    locSel.innerHTML = '<option value="" disabled selected>SELECT LOCATION</option>';
    if(worldData[country] && worldData[country][city]) {
        worldData[country][city].forEach(l => locSel.add(new Option(l.toUpperCase(), l)));
    }
}

function checkSlots() {
    const status = document.getElementById('slot-status-text');
    status.innerHTML = '<span class="text-[#FCA311] animate-pulse">CONNECTING TO VAULT...</span>';
    setTimeout(() => { 
        status.innerHTML = '<span class="text-green-500 uppercase tracking-widest">Confirmed: Seats Available</span>'; 
    }, 1000);
}

// 4. THE SECURE ACCESS PROTOCOL (777)
let clickCount = 0;
function secureAccess() {
    clickCount++;
    if(clickCount >= 5) {
        if(prompt("ENTER PLATINUM COMMAND CODE:") === "777") {
            toggleAdminPanel();
        }
        clickCount = 0;
    }
}

function toggleAdminPanel() {
    document.getElementById('admin-panel').classList.toggle('hidden');
}

function generateMagCode() {
    const issue = document.getElementById('mag-issue').value;
    const img = document.getElementById('mag-img').value;
    const pdf = document.getElementById('mag-pdf').value;
    const output = `\n<div onclick="window.open('${pdf}')"><img src="${img}"></div>`;
    document.getElementById('admin-output').value = output;
}
