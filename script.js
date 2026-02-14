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














styles.css

/* --- CORE ARCHITECTURE --- */
* { box-sizing: border-box; -webkit-tap-highlight-color: transparent; margin: 0; padding: 0; }
body {
    font-family: 'Inter', sans-serif;
    background: #000000;
    color: #ffffff;
    overflow-x: hidden;
    line-height: 1.6;
}

/* --- HERO SECTION (RESTORED) --- */
.hero-container {
    position: relative;
    min-height: 100vh;
    display: flex;
    align-items: center; /* Centered vertically for impact */
    overflow: hidden;
    background-color: black;
}

.hero-bg-layer {
    position: absolute;
    top: 0; left: 0; width: 100%; height: 100%;
    background-image: url('hero-family.jpg'); /* Ensure this file exists */
    background-size: cover;
    background-position: center center;
    z-index: 0;
}

.hero-overlay-layer {
    position: absolute;
    top: 0; left: 0; width: 100%; height: 100%;
    z-index: 1;
    background: linear-gradient(180deg, rgba(0,0,0,0.3) 0%, rgba(0,0,0,0.8) 60%, #000000 100%);
}

.hero-content-layer {
    position: relative;
    z-index: 10;
    padding: 0 25px;
    max-width: 1200px;
    width: 100%;
    margin: 0 auto;
    margin-top: 80px; /* Offset for nav */
}

/* THIS RESTORES THE BIG TITLE */
.responsive-title {
    font-family: 'Oswald', sans-serif;
    font-size: clamp(3.5rem, 15vw, 7rem) !important;
    line-height: 0.9;
    text-transform: uppercase;
    font-weight: 700;
    margin-bottom: 20px;
}

/* --- SCROLLING MARQUEE (RESTORED) --- */
.hero-marquee {
    width: 100%;
    overflow: hidden;
    background: #000;
    padding: 20px 0;
    border-bottom: 1px solid #111;
}
.marquee-content {
    display: inline-block;
    white-space: nowrap;
    font-family: 'Oswald', sans-serif;
    font-size: 1.8rem;
    font-weight: 700;
    text-transform: uppercase;
    color: transparent;
    -webkit-text-stroke: 1px #FCA311;
    animation: marquee 40s linear infinite;
    letter-spacing: 2px;
}
.marquee-content .dot {
    color: #FCA311;
    -webkit-text-stroke: 0;
    margin: 0 20px;
    font-size: 0.8rem;
    vertical-align: middle;
}
@keyframes marquee { from { transform: translateX(0); } to { transform: translateX(-50%); } }

/* --- TYPOGRAPHY --- */
h1, h2, h3, .nav-links button { font-family: 'Oswald', sans-serif; }

/* REFINED MANIFESTO - HIGH END FIX */
.manifesto-quote {
    font-family: 'Oswald', sans-serif;
    font-weight: 500; /* Increased weight for clarity */
    font-style: normal; /* Removed italic so it looks solid */
    color: #ffffff;
    line-height: 1.3;
    font-size: clamp(1.2rem, 4vw, 1.8rem); /* Slightly larger */
    letter-spacing: 3px; /* Premium spacing */
    margin-top: 15px;
    margin-bottom: 30px;
    display: block;
    text-transform: uppercase;
    text-shadow: 0 2px 10px rgba(0,0,0,0.8);
}

.magazine-title { font-family: 'Playfair Display', serif; }

/* --- NAVIGATION --- */
nav {
    position: fixed;
    top: 0;
    width: 100%;
    z-index: 9999;
    background: rgba(0,0,0,0.9);
    backdrop-filter: blur(10px);
    border-bottom: 1px solid rgba(255,255,255,0.05);
    padding: 20px 0;
}
.nav-container { max-width: 1200px; margin: auto; display: flex; justify-content: flex-end; padding: 0 25px; align-items: center; }
.nav-links { display: flex; gap: 30px; }

.nav-links button {
    color: rgba(255,255,255,0.5);
    font-size: 14px;
    font-weight: 700;
    letter-spacing: 4px;
    border: none;
    background: none;
    cursor: pointer;
    text-transform: uppercase;
    transition: 0.4s cubic-bezier(0.4, 0, 0.2, 1);
}
.nav-links button.active { color: #FCA311; }
.nav-links button:hover { color: #fff; }

.mobile-toggle { display: none; background: none; border: none; color: #FCA311; cursor: pointer; }

@media(max-width:768px) {
    .mobile-toggle { display: block; }
    .nav-links {
        display: none;
        flex-direction: column;
        position: absolute;
        top: 65px; left: 0; width: 100%;
        background: #000;
        padding: 60px 40px;
        gap: 35px;
        border-bottom: 1px solid #1a1a1a;
        text-align: center;
    }
    .nav-links.active-menu { display: flex; }
    .nav-links button { font-size: 14px; letter-spacing: 5px; }
}

/* --- GLOBAL SECTION CONTAINER --- */
.section-container { display: none; padding: 100px 0; min-height: 100vh; width: 100%; background: #000; }
#home-wrapper { width: 100%; background: #000; }

.hero-cta {
    margin-top: 35px;
    border: 1px solid #FCA311;
    color: #FCA311;
    padding: 18px 45px;
    text-transform: uppercase;
    letter-spacing: 5px;
    font-weight: 700;
    font-size: 10px;
    cursor: pointer;
    background: transparent;
    transition: 0.5s;
}
.hero-cta:hover { background: #FCA311; color: #000; box-shadow: 0 0 30px rgba(252, 163, 17, 0.3); }

/* --- PREMIUM FORM --- */
.form-card { background: #080808; padding: 40px; border: 1px solid rgba(255,255,255,0.05); max-width: 550px; margin: 0 auto; border-radius: 2px; }
.group { position: relative; width: 100%; margin-bottom: 30px; }

.floating-input {
    width: 100%; padding: 12px 0; background: transparent !important;
    border: none; border-bottom: 1px solid rgba(255,255,255,0.1);
    color: white !important; font-size: 16px; outline: none; border-radius: 0;
    transition: 0.3s;
}
.floating-input:focus { border-bottom: 1px solid #FCA311; }

select.floating-input option {
    background-color: #ffffff !important;
    color: #000000 !important;
}

.floating-label { position: absolute; top: 12px; left: 0; color: rgba(255,255,255,0.3); font-size: 11px; text-transform: uppercase; letter-spacing: 2px; transition: 0.3s; pointer-events: none; }
.floating-input:focus ~ .floating-label, .floating-input:not(:placeholder-shown) ~ .floating-label { top: -15px; font-size: 9px; color: #FCA311; font-weight: 700; }

.submit-btn-premium { width: 100%; background: #FCA311; color: #000; font-weight: 900; padding: 22px; text-transform: uppercase; letter-spacing: 3px; border: none; cursor: pointer; transition: 0.4s; }
.submit-btn-premium:hover { background: #fff; }
.submit-btn-premium:disabled { background: #1a1a1a; color: #444; cursor: not-allowed; }

/* --- MERCH VAULT (MOBILE PRIORITY) --- */
.merch-vault-grid { display: grid !important; grid-template-columns: repeat(3, 1fr) !important; gap: 40px !important; }
.merch-card-v2 { display: flex; flex-direction: column; cursor: pointer; }
.merch-img-box { position: relative; aspect-ratio: 3/4; background: #0a0a0a; overflow: hidden; border: 1px solid rgba(255,255,255,0.03); }
.merch-display-img { width: 100%; height: 100%; object-fit: cover; filter: brightness(0.7); transition: 1.5s cubic-bezier(0.2, 1, 0.3, 1); }
.merch-card-v2:hover .merch-display-img { transform: scale(1.08); filter: brightness(1); }
.merch-info { padding: 25px 0; text-align: left; }
.merch-info h3 { font-size: 14px; letter-spacing: 2px; color: #fff; }
.merch-info p { font-size: 9px; color: #FCA311; margin-top: 8px; letter-spacing: 3px; font-weight: 700; opacity: 0.7; }

/* --- SERMON VAULT --- */
.sermon-card { transition: 0.5s cubic-bezier(0.165, 0.84, 0.44, 1); background: #080808; border: 1px solid rgba(255,255,255,0.03); border-radius: 2px; overflow: hidden; }
.sermon-card:hover { transform: translateY(-10px); border-color: rgba(252, 163, 17, 0.4); }
.sermon-thumb { transition: 1s cubic-bezier(0.4, 0, 0.2, 1); filter: grayscale(100%) contrast(1.2); }
.sermon-card:hover .sermon-thumb { filter: grayscale(0%); transform: scale(1.05); }

@media (max-width: 768px) {
    .merch-vault-grid { grid-template-columns: repeat(2, 1fr) !important; gap: 15px !important; }
    .section-container { padding: 80px 15px; }
}

/* --- UTILITIES --- */
.hidden { display: none; }
::-webkit-scrollbar { width: 5px; }
::-webkit-scrollbar-track { background: #000; }
::-webkit-scrollbar-thumb { background: #FCA311; }
