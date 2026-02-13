/* --- CONFIGURATION & DATA --- */
const API_URL = 'https://sheetdb.io/api/v1/9q45d3e7oe5ks';

const locationData = {
    "Ethiopia": {
        "Addis Ababa": ["Bole - Cup of Joe", "Kazanchis - Tomoca", "Old Airport - Galani"],
        "Adama": ["Central Venue"]
    },
    "Kenya": {
        "Nairobi": ["Westlands - Artcaffe", "Kilimani - Java House"]
    },
    "USA": {
        "Dallas": ["Deep Ellum Coffee", "Downtown Loft"],
        "New York": ["Brooklyn Studio", "Manhattan Gathering"]
    },
    "UK": {
        "London": ["Shoreditch Collective", "Soho Central"]
    },
    "Germany": { "Berlin": ["Mitte Coffee Hub"] },
    "Netherlands": { "Amsterdam": ["The Canal Table"] },
    "Sweden": { "Stockholm": ["Gamla Stan Meet"] },
    "Norway": { "Oslo": ["Fjord Faith Circle"] },
    "Denmark": { "Copenhagen": ["Nordic Grace"] },
    "South Africa": { "Johannesburg": ["Sandton Gathering"] },
    "Uganda": { "Kampala": ["Hilltop Coffee"] },
    "Rwanda": { "Kigali": ["Convention View"] }
};

/* --- INITIALIZATION --- */
document.addEventListener('DOMContentLoaded', () => {
    // Initialize Lucide Icons
    if (window.lucide) { lucide.createIcons(); }

    // Mobile Menu Toggle Logic
    const menuToggle = document.getElementById('menu-toggle');
    const navLinks = document.getElementById('nav-links');
    if (menuToggle && navLinks) {
        menuToggle.addEventListener('click', () => {
            navLinks.classList.toggle('active-menu');
        });
    }

    // Form Submission Logic
    const regForm = document.getElementById('regForm');
    if (regForm) {
        regForm.addEventListener('submit', handleFormSubmit);
    }
});

/* --- NAVIGATION LOGIC --- */
function showSection(id, btn) {
    const sections = ['home-wrapper', 'magazine', 'merch', 'sermon', 'events', 'support', 'join'];
    
    sections.forEach(sectionId => {
        const el = document.getElementById(sectionId);
        if (el) { el.classList.add('hidden'); }
    });

    const targetId = (id === 'home') ? 'home-wrapper' : id;
    const target = document.getElementById(targetId);
    if (target) { target.classList.remove('hidden'); }

    // Nav UI updates
    document.querySelectorAll('.nav-links button').forEach(b => b.classList.remove('active'));
    if (btn) {
        btn.classList.add('active');
    } else {
        const joinBtn = document.querySelector("button[onclick*='join']");
        if (joinBtn) joinBtn.classList.add('active');
    }

    const navLinks = document.getElementById('nav-links');
    if (navLinks) navLinks.classList.remove('active-menu');
    
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

/* --- VIDEO OVERLAY --- */
function openVideo(videoId) {
    const overlay = document.createElement('div');
    overlay.id = "video-overlay";
    overlay.style = "position:fixed; top:0; left:0; width:100%; height:100%; background:rgba(0,0,0,0.98); z-index:10000; display:flex; align-items:center; justify-content:center; backdrop-filter: blur(10px);";
    
    overlay.innerHTML = `
        <div style="width:95%; max-width:900px; aspect-ratio:16/9; position:relative;">
            <button onclick="document.getElementById('video-overlay').remove()" 
                    style="position:absolute; top:-50px; right:0; color:#FCA311; background:none; border:none; font-family:'Oswald'; cursor:pointer; letter-spacing:3px; font-weight:bold; font-size:14px;">
                CLOSE [X]
            </button>
            <iframe width="100%" height="100%" 
                    src="https://www.youtube.com/embed/${videoId}?autoplay=1" 
                    frameborder="0" allow="autoplay; encrypted-media" allowfullscreen 
                    style="box-shadow: 0 0 50px rgba(0,0,0,0.5); border: 1px solid #111;">
            </iframe>
        </div>
    `;
    document.body.appendChild(overlay);
}

/* --- DYNAMIC DROP-DOWNS --- */
function updateCities() {
    const country = document.getElementById('country').value;
    const citySelect = document.getElementById('city');
    const locSelect = document.getElementById('location');
    
    citySelect.innerHTML = '<option value="" disabled selected></option>';
    locSelect.innerHTML = '<option value="" disabled selected></option>';

    if (locationData[country]) {
        Object.keys(locationData[country]).forEach(city => {
            let opt = document.createElement('option');
            opt.value = city;
            opt.innerHTML = city;
            citySelect.appendChild(opt);
        });
    }
}

function updateLocations() {
    const country = document.getElementById('country').value;
    const city = document.getElementById('city').value;
    const locSelect = document.getElementById('location');
    
    locSelect.innerHTML = '<option value="" disabled selected></option>';

    if (locationData[country] && locationData[country][city]) {
        locationData[country][city].forEach(loc => {
            let opt = document.createElement('option');
            opt.value = loc;
            opt.innerHTML = loc;
            locSelect.appendChild(opt);
        });
    }
}

/* --- REAL-TIME SLOT CHECKER --- */
async function checkSlots() {
    const location = document.getElementById('location').value;
    const badge = document.getElementById('slot-badge');
    const statusText = document.getElementById('slot-status-text');
    const submitBtn = document.getElementById('submit-btn');

    badge.classList.remove('hidden');
    statusText.innerText = "VERIFYING AVAILABILITY...";
    submitBtn.disabled = true;

    try {
        const response = await fetch(`${API_URL}/search?Location=${encodeURIComponent(location)}`);
        const data = await response.json();
        
        const taken = data.length;
        const remaining = 8 - taken;

        if (remaining > 0) {
            statusText.innerHTML = `<span style="color: #4BB543;">CONFIRMED: ${remaining} SEATS REMAINING</span>`;
            submitBtn.disabled = false;
        } else {
            statusText.innerHTML = `<span style="color: #ff4444;">SORRY: THIS TABLE IS FULL</span>`;
            submitBtn.disabled = true;
        }
    } catch (error) {
        statusText.innerText = "ERROR CHECKING SLOTS. TRY AGAIN.";
        submitBtn.disabled = false;
    }
}

/* --- FORM SUBMISSION --- */
async function handleFormSubmit(e) {
    e.preventDefault();
    const btn = document.getElementById('submit-btn');
    const btnText = document.getElementById('btn-text');
    
    btnText.innerText = "RESERVING...";
    btn.disabled = true;

    const formData = new FormData(e.target);
    const data = Object.fromEntries(formData.entries());

    try {
        const response = await fetch(API_URL, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ data: [data] })
        });

        if (response.ok) {
            btn.style.background = "#4BB543";
            btnText.innerText = "SEAT RESERVED!";
            alert("Welcome to the Table. Your seat is confirmed.");
            e.target.reset();
            document.getElementById('slot-badge').classList.add('hidden');
        } else {
            throw new Error("Submission failed");
        }
    } catch (err) {
        alert("Connection error. Please check your internet and try again.");
        btn.disabled = false;
        btnText.innerText = "CONFIRM RESERVATION";
    }
}
