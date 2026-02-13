/* --- CONFIGURATION --- */
const API_URL = 'https://sheetdb.io/api/v1/9q45d3e7oe5ks';

/* --- NAVIGATION LOGIC --- */
function showSection(id, btn) {
    const sections = ['home-wrapper', 'magazine', 'merch', 'sermon', 'events', 'support', 'join'];
    sections.forEach(sectionId => {
        const el = document.getElementById(sectionId);
        if (el) {
            el.style.display = 'none';
            el.classList.add('hidden');
        }
    });

    if (id === 'home') {
        const wrapper = document.getElementById('home-wrapper');
        const homeHeader = document.getElementById('home');
        if (wrapper) { wrapper.style.display = 'block'; wrapper.classList.remove('hidden'); }
        if (homeHeader) { homeHeader.style.display = 'flex'; homeHeader.classList.remove('hidden'); }
    } else {
        const target = document.getElementById(id);
        if (target) { target.style.display = 'block'; target.classList.remove('hidden'); }
    }

    document.querySelectorAll('.nav-links button').forEach(b => b.classList.remove('active'));
    if (btn) btn.classList.add('active');

    const navLinks = document.getElementById('nav-links');
    if (navLinks) navLinks.classList.remove('active-menu');
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

/* --- MOBILE MENU --- */
document.getElementById('menu-toggle')?.addEventListener('click', function(e) {
    e.stopPropagation();
    document.getElementById('nav-links')?.classList.toggle('active-menu');
});

/* --- VIDEO OVERLAY --- */
function openVideo(videoId) {
    const overlay = document.createElement('div');
    overlay.style = "position:fixed; top:0; left:0; width:100%; height:100%; background:rgba(0,0,0,0.95); z-index:10000; display:flex; align-items:center; justify-content:center; backdrop-filter: blur(5px);";
    overlay.innerHTML = `
        <div style="width:90%; max-width:800px; aspect-ratio:16/9; position:relative;">
            <button onclick="this.parentElement.parentElement.remove()" style="position:absolute; top:-40px; right:0; color:#FCA311; background:none; border:none; font-family:'Oswald'; cursor:pointer; letter-spacing:2px; font-weight:bold;">CLOSE [X]</button>
            <iframe width="100%" height="100%" src="https://www.youtube.com/embed/${videoId}?autoplay=1" frameborder="0" allow="autoplay; encrypted-media" allowfullscreen></iframe>
        </div>
    `;
    document.body.appendChild(overlay);
}

/* --- LIVE SLOT CHECKER --- */
async function checkSlots() {
    const loc = document.getElementById('location').value;
    const badge = document.getElementById('slot-badge');
    const statusText = document.getElementById('slot-status-text');
    const submitBtn = document.getElementById('submit-btn');
 
    if(!loc) return;
 
    // UI Feedback: Show badge immediately
    if(badge) {
        badge.classList.remove('hidden');
        badge.style.display = 'block';
        badge.style.background = 'rgba(252, 163, 17, 0.05)';
    }
    if(statusText) statusText.innerHTML = `<span style="letter-spacing:2px; color: #aaa;">VERIFYING DATABASE...</span>`;
 
    submitBtn.disabled = true;
    submitBtn.style.opacity = "0.5";

    try {
        const res = await fetch(API_URL);
        const data = await res.json();
        const taken = data.filter(r => r.Location === loc).length;
        const available = 8 - taken;

        if (available <= 0) {
            statusText.innerHTML = `<span style="color: #ff4444; font-weight: bold; letter-spacing: 1px;">SECURED \[0/8] — LOCATION FULL</span>`;
            submitBtn.disabled = true;
            submitBtn.style.opacity = "0.2";
            submitBtn.innerText = "NO SEATS REMAINING";
        } else {
            // High-end counter text
            statusText.innerHTML = `LIVE AVAILABILITY: <span style="font-size: 1.1rem; color: #fff; margin: 0 4px;">${available}</span> SEATS REMAINING`;
            submitBtn.disabled = false;
            submitBtn.style.opacity = "1";
            submitBtn.innerText = "CONFIRM RESERVATION";
        }
    } catch(e) {
        statusText.innerText = "CONNECTION ERROR. PLEASE REFRESH.";
        submitBtn.disabled = false;
    }
}

/* --- DATABASE --- */
const db = {
    "Ethiopia": {
        "Addis Ababa": ["Bole", "Mexico", "Piassa", "Megenagna", "CMC", "Old Airport"],
        "Hawassa": ["City Center"]
    },
    "Kenya": { "Nairobi": ["Kilimani", "Westlands"] },
    "USA": { "Dallas": ["Downtown", "Plano"], "Houston": ["Galleria"] },
    "UK": { "London": ["Central", "Canary Wharf"] },
    "Germany": { "Berlin": ["Mitte"] },
    "Netherlands": { "Amsterdam": ["Zuid"] },
    "Sweden": { "Stockholm": ["Norrmalm"] },
    "Norway": { "Oslo": ["Sentrum"] },
    "Denmark": { "Copenhagen": ["Indre By"] },
    "South Africa": { "Johannesburg": ["Sandton"], "Cape Town": ["City Bowl"] },
    "Uganda": { "Kampala": ["Central"] },
    "Rwanda": { "Kigali": ["Nyarugenge"] }
};

function updateCities() {
    const country = document.getElementById('country').value;
    const citySelect = document.getElementById('city');
    citySelect.innerHTML = '<option value="" disabled selected></option>';
    if (db[country]) Object.keys(db[country]).forEach(c => citySelect.add(new Option(c, c)));
}

function updateLocations() {
    const country = document.getElementById('country').value;
    const city = document.getElementById('city').value;
    const locSelect = document.getElementById('location');
    locSelect.innerHTML = '<option value="" disabled selected></option>';
    if (db[country] && db[country][city]) db[country][city].forEach(l => locSelect.add(new Option(l, l)));
}

/* --- INITIALIZE & SUBMIT --- */
document.addEventListener('DOMContentLoaded', () => {
    if(window.lucide) lucide.createIcons();
    showSection('home', document.querySelector('.nav-links button:first-child'));

    document.getElementById('regForm')?.addEventListener('submit', async function(e) {
        e.preventDefault();
        const btn = document.getElementById('submit-btn');
        const loc = document.getElementById('location').value;
 
        btn.disabled = true;
        btn.innerText = "VALIDATING SEAT...";

        try {
            // Final hard-check before allowing the POST
            const res = await fetch(API_URL);
            const data = await res.json();
            const taken = data.filter(r => r.Location === loc).length;

            if (taken >= 8) {
                alert("This location reached its 8-seat limit while you were filling the form. Please select a different location.");
                checkSlots();
                return;
            }

            btn.innerText = "PROCESSING...";
            const now = new Date();
            const payload = {
                "Name": document.getElementById('name').value,
                "Phone": document.getElementById('phone').value,
                "Email": document.getElementById('email').value,
                "Country": document.getElementById('country').value,
                "City": document.getElementById('city').value,
                "Location": loc,
                "Registration Date": now.toLocaleDateString(),
                "Registration Time": now.toLocaleTimeString()
            };

            const postRes = await fetch(API_URL, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ data: [payload] })
            });

            if(postRes.ok) {
                btn.innerText = "RESERVATION SECURED";
                btn.style.background = "#fff";
                btn.style.color = "#000";
                this.reset();
 
                // Keep success message for 3 seconds before returning home
                setTimeout(() => {
                    showSection('home');
                    btn.style.background = "#FCA311";
                    btn.style.color = "white";
                    btn.innerText = "CONFIRM RESERVATION";
                    btn.disabled = false;
                    btn.style.opacity = "1";
                }, 3000);
            }
        } catch (err) {
            btn.disabled = false;
            btn.innerText = "CONFIRM RESERVATION";
            alert("Submission failed. Check your internet connection.");
        }
    });
});
