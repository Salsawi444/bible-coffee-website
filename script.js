/* --- VAULT SEALED: THE PLATINUM JS --- */

lucide.createIcons();

// 1. THE GLOBAL DATA MAP
const worldData = {
    "Ethiopia": {
        "Addis Ababa": ["The Cup (Bole Atlas)", "Tomoca (Piassa)", "Galani Coffee (Summit)", "Sarbet (Old Vic)"],
        "Hawassa": ["Ker-Awud International", "Haile Resort"]
    },
    "Kenya": { 
        "Nairobi": ["CJ's (Kilimani)", "Java House (Westlands)", "Artcaffe (Karen)"] 
    },
    "USA": { 
        "Dallas": ["Ascension (Design District)", "Method Coffee"],
        "NYC": ["Devocion (Brooklyn)"] 
    }
};

// 2. NAVIGATION & SECTION ENGINE
function showSection(id, btn) {
    const home = document.getElementById('home-wrapper');
    if(home) home.style.display = (id === 'home') ? 'block' : 'none';
    
    document.querySelectorAll('.section-container').forEach(s => s.classList.remove('section-active'));
    
    if(id !== 'home') {
        const target = document.getElementById(id);
        if(target) target.classList.add('section-active');
    }

    document.querySelectorAll('.nav-links button').forEach(b => b.classList.remove('active'));
    if(btn) btn.classList.add('active');
    window.scrollTo({top: 0, behavior: 'smooth'});
}

// 3. JOYSTICK LOGIC (DEPENDENT DROPDOWNS)
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
    locSel.innerHTML = '<option value="" disabled selected>MEETING POINT</option>';
    if(worldData[country] && worldData[country][city]) {
        worldData[country][city].forEach(l => locSel.add(new Option(l.toUpperCase(), l)));
    }
}

// 4. SECURE ACCESS (THE 777 TERMINAL PROTOCOL)
let clickCount = 0;
function secureAccess() {
    clickCount++;
    if(clickCount >= 5) {
        const pass = prompt("ENTER PLATINUM COMMAND CODE:");
        if(pass === "777") {
            toggleAdminPanel();
        }
        clickCount = 0;
    }
}

function toggleAdminPanel() {
    document.getElementById('admin-panel').classList.toggle('vault-open');
}

// 5. MAGAZINE DATA INJECTOR
function generateMagCode() {
    const issue = document.getElementById('mag-issue').value;
    const img = document.getElementById('mag-img').value;
    const pdf = document.getElementById('mag-pdf').value;
    
    const code = `\n<div class="magazine-card">\n  <img src="${img}">\n  <a href="${pdf}" target="_blank">READ ISSUE</a>\n</div>`;
    
    document.getElementById('admin-output').value = code;
}
