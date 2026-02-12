const API_URL = "https://sheetdb.io/api/v1/9q45d3e7oe5ks";
const ADMIN_PHONE = "251910884585";
const MAX_CAPACITY = 8;

const locs = {
    "Ethiopia": { 
        "Addis Ababa": ["Bole", "Ayat", "Megenagna", "Mexico", "Haile Garment", "Old Airport"], 
        "Hawassa": ["Center"], "Adama": ["Center"] 
    },
    "Kenya": { "Nairobi": ["Westlands", "Kilimani"], "Mombasa": ["Nyali"] },
    "Netherlands": { "Amsterdam": ["Centrum", "Zuid"], "Rotterdam": ["City Center"] },
    "Sweden": { "Stockholm": ["Norrmalm", "Södermalm"] },
    "Germany": { "Berlin": ["Mitte"], "Frankfurt": ["City Center"] },
    "UK": { "London": ["Central London"], "Manchester": ["City Centre"] },
    "USA": { "Dallas": ["Downtown"], "New York": ["Manhattan"] },
    "Canada": { "Toronto": ["Downtown"] }
};

// --- NAVIGATION ---
function showSection(id, btn) {
    document.querySelectorAll('.hidden-section').forEach(el => el.style.display = 'none');
    const wrapper = document.getElementById('home-wrapper');
    if (wrapper) wrapper.style.display = (id === 'home') ? 'block' : 'none';
    const section = document.getElementById(id);
    if (section && id !== 'home') section.style.display = 'block';
    
    document.querySelectorAll('.nav-links button').forEach(b => b.classList.remove('active'));
    if (btn) btn.classList.add('active');
    window.scrollTo({top: 0, behavior: 'smooth'});
}

// --- DROPDOWN CASCADE ---
function updateCities() {
    const country = document.getElementById('country').value;
    const citySel = document.getElementById('city');
    citySel.innerHTML = '<option value="" disabled selected>City</option>';
    citySel.disabled = true;
    document.getElementById('subCityGroup').classList.add('hidden');
    document.getElementById('counterBox').classList.add('hidden');

    if(locs[country]) {
        Object.keys(locs[country]).forEach(city => citySel.add(new Option(city, city)));
        citySel.disabled = false;
    }
}

function updateSubCities() {
    const country = document.getElementById('country').value;
    const city = document.getElementById('city').value;
    const subCitySel = document.getElementById('subCity');
    subCitySel.innerHTML = '<option value="" disabled selected>Select Area</option>';
    if(locs[country] && locs[country][city]) {
        locs[country][city].forEach(area => subCitySel.add(new Option(area, area)));
        document.getElementById('subCityGroup').classList.remove('hidden');
    }
}

// --- SEARCH ALGORITHM (CHECKING AVAILABILITY) ---
async function checkSpots() {
    const spot = document.getElementById('subCity').value;
    if (!spot) return;
    
    document.getElementById('counterBox').classList.remove('hidden');
    const countSpan = document.getElementById('spotsLeft');
    countSpan.innerText = "...";

    try {
        // Querying based on the "Location" column in your sheet
        const res = await fetch(`${API_URL}/search?Location=${spot}`); 
        const data = await res.json();
        const remaining = MAX_CAPACITY - data.length;
        
        countSpan.innerText = remaining > 0 ? remaining : 0;
        const btn = document.getElementById('subBtn');
        
        if (remaining <= 0) {
            btn.disabled = true;
            btn.innerText = "LOCATION FULL";
        } else {
            btn.disabled = false;
            btn.innerText = "Confirm Registration";
        }
    } catch (e) { 
        countSpan.innerText = "!";
        console.error("Sync Error"); 
    }
}

// --- SUBMISSION (RECORDING TO DATABASE) ---
document.getElementById('regForm').onsubmit = async (e) => {
    e.preventDefault();
    const btn = document.getElementById('subBtn');
    btn.innerText = "SYNCING...";
    btn.disabled = true;

    const now = new Date();
    const payload = {
        "Name": document.getElementById('name').value,
        "Phone": document.getElementById('phone').value,
        "Email": document.getElementById('email').value,
        "Country": document.getElementById('country').value,
        "City": document.getElementById('city').value,
        "Location": document.getElementById('subCity').value,
        "Registration Date": now.toLocaleDateString(),
        "Registration Time": now.toLocaleTimeString()
    };

    try {
        await fetch(API_URL, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ data: [payload] })
        });

        // WhatsApp trigger
        const waMsg = `New Registration:%0AName: ${payload.Name}%0APhone: ${payload.Phone}%0ALocation: ${payload.Location}`;
        window.open(`https://wa.me/${ADMIN_PHONE}?text=${waMsg}`, '_blank');
        
        alert("Registration Secured!");
        location.reload(); // Refreshes to clear form and update counts
    } catch (err) {
        alert("Database Sync Error.");
        btn.disabled = false;
        btn.innerText = "Confirm Registration";
    }
};

document.addEventListener("DOMContentLoaded", () => { lucide.createIcons(); });
