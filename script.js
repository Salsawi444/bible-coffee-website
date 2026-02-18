/* --- 0. THE CODE JOYSTICK (DESKTOP ONLY) - PRESERVED --- */
const DESKTOP_POS = {
    titleY: 5,      
    contentY: 0,    
    globalX: -130      
};

/* --- 1. GLOBAL DATABASE (WORLD TOUR EDITION) - PRESERVED --- */
const globalData = {
    "Ethiopia": {
        cities: ["Addis Ababa", "Nazreth", "Hawassa", "Bahir Dar", "Dire Dawa", "Gondar", "Jimma", "Mekelle", "Dessie"],
        locations: { "Addis Ababa": ["Bole Atlas (The Cup)", "Kazanchis", "Old Airport", "Sarbet", "CMC", "Piyassa"] }
    },
    "Kenya": {
        cities: ["Nairobi", "Mombasa", "Kisumu", "Nakuru", "Eldoret"],
        locations: { "Nairobi": ["Westlands Hub", "Karen Table", "Kilimani Coffee Shop", "CBD Central"] }
    },
    "South Africa": {
        cities: ["Johannesburg", "Cape Town", "Pretoria", "Durban", "Port Elizabeth"],
        locations: { "Johannesburg": ["Sandton Table", "Soweto Hub", "Braamfontein Vault"] }
    },
    "Nigeria": {
        cities: ["Lagos", "Abuja", "Port Harcourt", "Ibadan"],
        locations: { "Lagos": ["Lekki Phase 1", "Ikeja Hub", "Victoria Island"] }
    },
    "USA": {
        cities: ["New York", "Dallas", "Los Angeles", "Chicago"],
        locations: { "Dallas": ["Deep Ellum Coffee", "Downtown Vault", "Plano Table"] }
    }
};

/* --- 2. NAVIGATION LOGIC --- */
function showSection(sectionId, btn) {
    // Hide all sections
    document.querySelectorAll('.section-container').forEach(s => {
        s.classList.add('hidden');
        s.style.display = 'none';
    });
    
    // Special handling for Home wrapper
    const homeWrapper = document.getElementById('home-wrapper');
    if (sectionId === 'home') {
        homeWrapper.style.display = 'block';
    } else {
        homeWrapper.style.display = 'none';
    }

    // Show target section
    const target = document.getElementById(sectionId);
    if (target) {
        target.classList.remove('hidden');
        target.style.display = 'block';
        window.scrollTo(0, 0);
    }

    // Update active button state
    document.querySelectorAll('.nav-links button').forEach(b => b.classList.remove('active'));
    if (btn) btn.classList.add('active');

    // Close mobile menu after selection
    document.getElementById('nav-links').classList.remove('active');
}

/* Mobile Menu Toggle */
document.getElementById('menu-toggle').addEventListener('click', () => {
    document.getElementById('nav-links').classList.toggle('active');
});

/* --- 3. TERMINAL ACCESS PROTOCOL --- */
function secureAccess() {
    const code = prompt("ENTER ADMIN CODE:");
    if (code === "the Platinum, the mighty CODE!") {
        document.getElementById('admin-panel').classList.remove('hidden');
    } else {
        alert("ACCESS DENIED.");
    }
}

function toggleAdminPanel() {
    document.getElementById('admin-panel').classList.add('hidden');
}

/* --- 4. DYNAMIC FORM LOGIC --- */
function updateCities() {
    const country = document.getElementById('country').value;
    const citySelect = document.getElementById('city');
    citySelect.innerHTML = '<option value="" disabled selected>SELECT CITY</option>';
    
    if (globalData[country]) {
        globalData[country].cities.forEach(city => {
            citySelect.innerHTML += `<option value="${city}">${city.toUpperCase()}</option>`;
        });
    }
}

function updateLocations() {
    const country = document.getElementById('country').value;
    const city = document.getElementById('city').value;
    const locSelect = document.getElementById('location');
    locSelect.innerHTML = '<option value="" disabled selected>SELECT LOCATION</option>';

    if (globalData[country]?.locations[city]) {
        globalData[country].locations[city].forEach(loc => {
            locSelect.innerHTML += `<option value="${loc}">${loc.toUpperCase()}</option>`;
        });
    } else {
        locSelect.innerHTML += `<option value="standard">GENERAL CITY HUB</option>`;
    }
}

/* --- 5. ADMIN GENERATORS (PRESERVED) --- */
function copyAdminCode() {
    const output = document.getElementById('admin-output');
    output.select();
    document.execCommand('copy');
    alert("CODE COPIED TO CLIPBOARD.");
}
