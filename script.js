// CONFIGURATION
const API_URL = "https://sheetdb.io/api/v1/9q45d3e7oe5ks";
const ADMIN_PHONE = "251910884585";
const MAX_CAPACITY = 8;

// GEOGRAPHIC DATA
const locs = {
    "Ethiopia": { 
        "Addis Ababa": ["Bole", "Ayat", "Megenagna", "Mexico", "Haile Garment", "Old Airport"], 
        "Hawassa": ["Center"], 
        "Adama": ["Center"] 
    },
    "USA": { "Dallas": ["Downtown"] },
    "Germany": { "Berlin": ["Mitte"] }
};

// NAVIGATION
const menuToggle = document.getElementById('menu-toggle');
const navLinks = document.getElementById('nav-links');

if(menuToggle) {
    menuToggle.addEventListener('click', () => {
        navLinks.classList.toggle('active-menu');
    });
}

function showSection(id, btn) {
    // Hide all main elements
    document.querySelectorAll('.hidden-section').forEach(el => el.style.display = 'none');
    const homeWrapper = document.getElementById('home-wrapper');
    
    if (id === 'home') {
        homeWrapper.style.display = 'block';
    } else {
        homeWrapper.style.display = 'none';
        document.getElementById(id).style.display = 'block';
    }

    // Nav Active State Styling
    document.querySelectorAll('.nav-links button').forEach(b => b.classList.remove('active'));
    if (btn) btn.classList.add('active');

    // Reset Mobile Nav
    if(navLinks) navLinks.classList.remove('active-menu');
    
    window.scrollTo({top: 0, behavior: 'smooth'});
}

// FORM CASCADE LOGIC
function updateCities() {
    const countryVal = document.getElementById('country').value;
    const citySel = document.getElementById('city');
    
    // Clear & Lock
    citySel.innerHTML = '<option value="" disabled selected>Select City</option>';
    citySel.disabled = true;
    
    // Reset following steps
    document.getElementById('subCityGroup').classList.add('hidden');
    document.getElementById('counterBox').classList.add('hidden');

    if(locs[countryVal]) {
        Object.keys(locs[countryVal]).forEach(city => {
            citySel.add(new Option(city, city));
        });
        citySel.disabled = false;
    }
}

function updateSubCities() {
    const country = document.getElementById('country').value;
    const city = document.getElementById('city').value;
    const subCitySel = document.getElementById('subCity');
    
    subCitySel.innerHTML = '<option value="" disabled selected>Select Area</option>';
    
    if(locs[country] && locs[country][city]) {
        locs[country][city].forEach(area => {
            subCitySel.add(new Option(area, area));
        });
        document.getElementById('subCityGroup').classList.remove('hidden');
    }
}

// REAL-TIME AVAILABILITY
async function checkSpots() {
    const spot = document.getElementById('subCity').value;
    const box = document.getElementById('counterBox');
    const btn = document.getElementById('subBtn');
    const countSpan = document.getElementById('spotsLeft');
    
    if (!spot) return;
    
    box.classList.remove('hidden');
    countSpan.innerText = "...";
    
    try {
        const res = await fetch(`${API_URL}/search?Spot=${spot}`);
        const data = await res.json();
        const remaining = MAX_CAPACITY - data.length;
        
        countSpan.innerText = remaining > 0 ? remaining : 0;
        
        if (remaining <= 0) {
            btn.disabled = true;
            btn.innerText = "LOCATION FULL";
        } else {
            btn.disabled = false;
            btn.innerText = "CONFIRM REGISTRATION";
        }
    } catch (e) {
        countSpan.innerText = "!";
        console.error("API Error");
    }
}

// FORM SUBMISSION
const regForm = document.getElementById('regForm');
if(regForm) {
    regForm.onsubmit = async (e) => {
        e.preventDefault();
        const btn = document.getElementById('subBtn');
        const originalText = btn.innerText;
        
        btn.innerText = "SYNCING...";
        btn.disabled = true;

        const payload = {
            "Name": document.getElementById('name').value,
            "Email": document.getElementById('email').value,
            "Phone": document.getElementById('phone').value,
            "Country": document.getElementById('country').value,
            "City": document.getElementById('city').value,
            "Spot": document.getElementById('subCity').value,
            "Registration Date": new Date().toLocaleDateString(),
            "Registration Time": new Date().toLocaleTimeString()
        };

        try {
            // POST to SheetDB
            await fetch(API_URL, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ data: [payload] })
            });

            // Trigger WhatsApp
            const waMsg = `Bible %26 Coffee Registration%0AName: ${payload.Name}%0ALocation: ${payload.Spot}`;
            window.open(`https://wa.me/${ADMIN_PHONE}?text=${waMsg}`, '_blank');

            alert("Secured! Your spot is waiting.");
            
            // UI Reset
            regForm.reset();
            updateCities(); // This will lock and clear dependent fields
            btn.innerText = "Confirm Registration";
            btn.disabled = false;

        } catch (err) {
            alert("Connection Error. Please try again.");
            btn.innerText = originalText;
            btn.disabled = false;
        }
    };
}

// Global Initialization
document.addEventListener("DOMContentLoaded", () => {
    lucide.createIcons();
});
