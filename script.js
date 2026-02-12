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
    if (id !== 'home') {
        const target = document.getElementById(id);
        if(target) target.style.display = 'block';
    }
    document.querySelectorAll('.nav-links button').forEach(b => b.classList.remove('active'));
    if (btn) btn.classList.add('active');
    window.scrollTo({top: 0, behavior: 'smooth'});
}

// CASCADE DROPDOWNS
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

// REACTIVE SPOT CHECKER
async function checkSpots() {
    const spot = document.getElementById('subCity').value;
    const countBox = document.getElementById('counterBox');
    const statusMsg = document.getElementById('statusMessage');
    const countSpan = document.getElementById('spotsLeft');
    const btn = document.getElementById('subBtn');

    if (!spot) return;

    countBox.classList.remove('hidden');
    statusMsg.classList.add('hidden');
    countSpan.innerText = "...";
    btn.disabled = true;

    try {
        const res = await fetch(`${API_URL}/search?Location=${spot}`);
        const data = await res.json();
        const remaining = MAX_CAPACITY - data.length;

        countSpan.innerText = remaining > 0 ? remaining : 0;

        if (remaining <= 0) {
            statusMsg.classList.remove('hidden');
            btn.innerText = "LOCATION FULL";
            btn.disabled = true;
        } else {
            statusMsg.classList.add('hidden');
            btn.innerText = "Confirm Registration";
            btn.disabled = false;
        }
    } catch (e) { countSpan.innerText = "!"; }
}

// FINAL SUBMISSION HANDLER
document.getElementById('regForm').onsubmit = async (e) => {
    e.preventDefault();
    
    // Strict Field Check
    const locationVal = document.getElementById('subCity').value;
    if (!locationVal) {
        alert("Please select a specific spot/area to join.");
        return;
    }

    const btn = document.getElementById('subBtn');
    btn.innerText = "SYNCING...";
    btn.disabled = true;

    // Fixed Date/Time Logic (DD/MM/YYYY)
    const now = new Date();
    const cleanDate = `${String(now.getDate()).padStart(2, '0')}/${String(now.getMonth() + 1).padStart(2, '0')}/${now.getFullYear()}`;
    const cleanTime = `${String(now.getHours()).padStart(2, '0')}:${String(now.getMinutes()).padStart(2, '0')}`;

    const payload = {
        "Name": document.getElementById('name').value,
        "Phone": document.getElementById('phone').value,
        "Email": document.getElementById('email').value,
        "Country": document.getElementById('country').value,
        "City": document.getElementById('city').value,
        "Location": locationVal,
        "Registration Date": cleanDate,
        "Registration Time": cleanTime
    };

    try {
        await fetch(API_URL, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ data: [payload] })
        });
        window.open(`https://wa.me/${ADMIN_PHONE}?text=New Registration: ${payload.Name} for ${payload.Location}`, '_blank');
        alert("Success! Welcome to the movement.");
        location.reload(); 
    } catch (err) {
        alert("Sync Error.");
        btn.disabled = false;
        btn.innerText = "Confirm Registration";
    }
};

document.addEventListener("DOMContentLoaded", () => { lucide.createIcons(); });
