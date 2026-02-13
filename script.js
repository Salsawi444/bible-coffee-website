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
    if (btn) {
        btn.classList.add('active');
    } else {
        const buttons = document.querySelectorAll('.nav-links button');
        buttons.forEach(b => {
            if(b.innerText.toLowerCase() === id.toLowerCase()) b.classList.add('active');
        });
    }

    const navLinks = document.getElementById('nav-links');
    if (navLinks) navLinks.classList.remove('active-menu');

    window.scrollTo({ top: 0, behavior: 'smooth' });
}

/* --- MOBILE MENU --- */
document.getElementById('menu-toggle')?.addEventListener('click', function(e) {
    e.stopPropagation();
    document.getElementById('nav-links').classList.toggle('active-menu');
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
    const statusText = document.getElementById('slot-status-text') || document.getElementById('slot-count');
    const submitBtn = document.getElementById('submit-btn');
    
    if(!loc) return;
    badge.classList.remove('hidden');
    
    // UI Feedback while checking
    submitBtn.disabled = true;
    const originalBtnText = submitBtn.innerText;
    submitBtn.innerText = "VERIFYING AVAILABILITY...";

    try {
        const response = await fetch(API_URL);
        const data = await response.json();
        const taken = data.filter(entry => entry.Location === loc).length;
        const available = 8 - taken;

        if (available <= 0) {
            if(statusText) statusText.innerHTML = `<span style="color: #ff4444;">TABLE FULL</span>`;
            submitBtn.disabled = true;
            submitBtn.style.opacity = "0.3";
            submitBtn.innerText = "NO SEATS LEFT";
        } else {
            if(statusText) statusText.innerText = available;
            submitBtn.disabled = false;
            submitBtn.style.opacity = "1";
            submitBtn.innerText = "CONFIRM RESERVATION";
        }
    } catch (error) {
        console.error("Slot check failed", error);
        submitBtn.disabled = false;
        submitBtn.innerText = "CONFIRM RESERVATION";
    }
}

/* --- DATABASE --- */
const db = {
    "Ethiopia": { 
        "Addis Ababa": ["Bole", "Mexico", "Piassa", "Megenagna", "CMC", "Old Airport"], 
        "Hawassa": ["City Center"] 
    },
    "Kenya": { "Nairobi": ["Kilimani", "Westlands"] }
};

function updateCities() {
    const country = document.getElementById('country').value;
    const citySelect = document.getElementById('city');
    citySelect.innerHTML = '<option value="" disabled selected></option>';
    if (db[country]) {
        Object.keys(db[country]).forEach(c => citySelect.add(new Option(c, c)));
    }
}

function updateLocations() {
    const country = document.getElementById('country').value;
    const city = document.getElementById('city').value;
    const locSelect = document.getElementById('location');
    locSelect.innerHTML = '<option value="" disabled selected></option>';
    if (db[country] && db[country][city]) {
        db[country][city].forEach(l => locSelect.add(new Option(l, l)));
    }
}

/* --- INITIALIZE --- */
document.addEventListener('DOMContentLoaded', () => {
    if(window.lucide) lucide.createIcons();
    
    showSection('home', document.querySelector('.nav-links button:first-child'));

    // --- SUBMISSION TO SHEETDB ---
    document.getElementById('regForm')?.addEventListener('submit', async function(e) {
        e.preventDefault();
        const btn = document.getElementById('submit-btn');
        const originalText = btn.innerText;
        
        btn.disabled = true;
        btn.innerText = "RESERVING SEAT...";

        const now = new Date();
        const data = {
            "Name": document.getElementById('name').value,
            "Phone": document.getElementById('phone').value,
            "Email": document.getElementById('email').value,
            "Country": document.getElementById('country').value,
            "City": document.getElementById('city').value,
            "Location": document.getElementById('location').value,
            "Registration Date": now.toLocaleDateString(),
            "Registration Time": now.toLocaleTimeString()
        };

        try {
            const response = await fetch(API_URL, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ data: [data] })
            });

            if(response.ok) {
                btn.innerText = "SUCCESS. SEAT SECURED.";
                btn.style.background = "#fff";
                btn.style.color = "#000";
                this.reset();
                setTimeout(() => {
                    showSection('home');
                    btn.innerText = "CONFIRM RESERVATION";
                    btn.style.background = "#FCA311";
                    btn.style.color = "#000";
                    btn.disabled = false;
                }, 3000);
            }
        } catch (error) {
            alert("Connection error. Please try again.");
            btn.disabled = false;
            btn.innerText = originalText;
        }
    });
});
