const API_URL = 'https://sheetdb.io/api/v1/9q45d3e7oe5ks';

function showSection(id, btn) {
    const sections = ['home-wrapper', 'magazine', 'merch', 'sermon', 'events', 'support', 'join'];
    const marquee = document.querySelector('.hero-marquee');

    sections.forEach(sectionId => {
        const el = document.getElementById(sectionId);
        if (el) { el.style.display = 'none'; el.classList.add('hidden'); }
    });

    if (id === 'home') {
        const wrapper = document.getElementById('home-wrapper');
        if (wrapper) { wrapper.style.display = 'block'; wrapper.classList.remove('hidden'); }
        if (marquee) { marquee.style.display = 'block'; }
    } else {
        const target = document.getElementById(id);
        if (target) { target.style.display = 'block'; target.classList.remove('hidden'); }
        if (marquee) { marquee.style.display = 'none'; }
    }

    document.querySelectorAll('.nav-links button').forEach(b => b.classList.remove('active'));
    if (btn) btn.classList.add('active');
    document.getElementById('nav-links')?.classList.remove('active-menu');
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

document.getElementById('menu-toggle')?.addEventListener('click', function(e) {
    e.stopPropagation();
    document.getElementById('nav-links')?.classList.toggle('active-menu');
});

function openVideo(videoId) {
    const overlay = document.createElement('div');
    overlay.style = "position:fixed; top:0; left:0; width:100%; height:100%; background:rgba(0,0,0,0.95); z-index:10000; display:flex; align-items:center; justify-content:center; backdrop-filter: blur(5px);";
    overlay.innerHTML = `
        <div style="width:90%; max-width:800px; aspect-ratio:16/9; position:relative;">
            <button onclick="this.parentElement.parentElement.remove()" style="position:absolute; top:-40px; right:0; color:#FCA311; background:none; border:none; font-family:'Oswald'; cursor:pointer; letter-spacing:2px; font-weight:bold;">CLOSE [X]</button>
            <iframe width="100%" height="100%" src="https://www.youtube.com/embed/${videoId}?autoplay=1" frameborder="0" allow="autoplay; encrypted-media" allowfullscreen></iframe>
        </div>`;
    document.body.appendChild(overlay);
}

async function checkSlots() {
    const loc = document.getElementById('location').value;
    const badge = document.getElementById('slot-badge');
    const statusText = document.getElementById('slot-status-text');
    const submitBtn = document.getElementById('submit-btn');
    if(!loc) return;
    if(badge) { badge.classList.remove('hidden'); badge.style.display = 'block'; }
    if(statusText) statusText.innerHTML = `<span style="color: #aaa;">VERIFYING DATABASE...</span>`;
    submitBtn.disabled = true;
    try {
        const res = await fetch(API_URL);
        const data = await res.json();
        const taken = data.filter(r => r.Location === loc).length;
        const available = 8 - taken;
        if (available <= 0) {
            statusText.innerHTML = `<span style="color: #ff4444;">LOCATION FULL</span>`;
            submitBtn.innerText = "NO SEATS REMAINING";
        } else {
            statusText.innerHTML = `LIVE AVAILABILITY: ${available} SEATS REMAINING`;
            submitBtn.disabled = false;
            submitBtn.innerText = "CONFIRM RESERVATION";
        }
    } catch(e) { statusText.innerText = "CONNECTION ERROR."; submitBtn.disabled = false; }
}

const db = {
    "Ethiopia": { "Addis Ababa": ["Bole", "Mexico", "Piassa", "Megenagna", "CMC", "Old Airport"], "Hawassa": ["City Center"] },
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

document.addEventListener('DOMContentLoaded', () => {
    showSection('home', document.querySelector('.nav-links button:first-child'));
    document.getElementById('regForm')?.addEventListener('submit', async function(e) {
        e.preventDefault();
        const btn = document.getElementById('submit-btn');
        btn.disabled = true;
        btn.innerText = "RESERVING...";
        try {
            const payload = {
                "Name": document.getElementById('name').value,
                "Phone": document.getElementById('phone').value,
                "Email": document.getElementById('email').value,
                "Country": document.getElementById('country').value,
                "City": document.getElementById('city').value,
                "Location": document.getElementById('location').value,
                "Registration Date": new Date().toLocaleDateString()
            };
            const postRes = await fetch(API_URL, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ data: [payload] })
            });
            if(postRes.ok) {
                btn.innerText = "SECURED";
                this.reset();
                setTimeout(() => showSection('home'), 2000);
            }
        } catch (err) { alert("Submission failed."); btn.disabled = false; }
    });
});
