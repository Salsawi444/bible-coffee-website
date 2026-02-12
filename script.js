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

// NAV LOGIC
function showSection(id, btn) {
    document.querySelectorAll('.hidden-section').forEach(el => el.style.display = 'none');
    document.getElementById('home-wrapper').style.display = (id === 'home') ? 'block' : 'none';
    if (id !== 'home') document.getElementById(id).style.display = 'block';
    document.querySelectorAll('.nav-links button').forEach(b => b.classList.remove('active'));
    if (btn) btn.classList.add('active');
    window.scrollTo({top: 0, behavior: 'smooth'});
}

// FORM CASCADE
function updateCities() {
    const country = document.getElementById('country').value;
    const citySel = document.getElementById('city');
    citySel.innerHTML = '<option value="" disabled selected>City</option>';
    citySel.disabled = true;
    document.getElementById('subCityGroup').classList.add('hidden');
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

// SPOT CHECK
async function checkSpots() {
    const spot = document.getElementById('subCity').value;
    if (!spot) return;
    document.getElementById('counterBox').classList.remove('hidden');
    try {
        const res = await fetch(`${API_URL}/search?Spot=${spot}`);
        const data = await res.json();
        const remaining = MAX_CAPACITY - data.length;
        document.getElementById('spotsLeft').innerText = remaining > 0 ? remaining : 0;
        document.getElementById('subBtn').disabled = (remaining <= 0);
        if (remaining <= 0) document.getElementById('subBtn').innerText = "LOCATION FULL";
    } catch (e) { console.error("API Error"); }
}

// SUBMISSION
document.getElementById('regForm').onsubmit = async (e) => {
    e.preventDefault();
    const btn = document.getElementById('subBtn');
    btn.innerText = "SYNCING...";
    btn.disabled = true;

    // BACKGROUND DATA GENERATION
    const now = new Date();
    const payload = {
        "Name": document.getElementById('name').value,
        "Email": document.getElementById('email').value,
        "Phone": document.getElementById('phone').value,
        "Country": document.getElementById('country').value,
        "City": document.getElementById('city').value,
        "Location": document.getElementById('subCity').value, // This maps to your 'Location' column
        "Registration Date": now.toLocaleDateString(),
        "Registration Time": now.toLocaleTimeString()
    };

    try {
        await fetch(API_URL, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ data: [payload] })
        });
        window.open(`https://wa.me/${ADMIN_PHONE}?text=New Registration: ${payload.Name} for ${payload.Location}`, '_blank');
        alert("Success!");
        location.reload(); 
    } catch (err) {
        alert("Error.");
        btn.disabled = false;
    }
};
