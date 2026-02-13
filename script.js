const API_URL = 'https://sheetdb.io/api/v1/9q45d3e7oe5ks';

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

function showSection(id, btn) {
    const sections = ['home-wrapper', 'magazine', 'merch', 'sermon', 'events', 'support', 'join'];
    sections.forEach(s => {
        const el = document.getElementById(s);
        if(el) el.style.display = 'none';
    });
    
    if(id === 'home') {
        document.getElementById('home-wrapper').style.display = 'block';
        document.getElementById('home').style.display = 'flex';
    } else {
        document.getElementById(id).style.display = 'block';
    }

    document.querySelectorAll('.nav-links button').forEach(b => b.classList.remove('active'));
    if(btn) btn.classList.add('active');
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

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

async function checkSlots() {
    const loc = document.getElementById('location').value;
    const badge = document.getElementById('slot-badge');
    const statusText = document.getElementById('slot-status-text');
    const submitBtn = document.getElementById('submit-btn');
    
    if(!loc) return;
    badge.classList.remove('hidden');
    statusText.innerText = "VERIFYING AVAILABILITY...";
    submitBtn.disabled = true;

    try {
        const res = await fetch(API_URL);
        const data = await res.json();
        const taken = data.filter(r => r.Location === loc).length;
        const available = 8 - taken;

        if (available <= 0) {
            statusText.innerHTML = `<span style="color: #ff4444;">LOCATION FULL [0/8]</span>`;
            submitBtn.innerText = "TABLE FULL";
        } else {
            statusText.innerHTML = `LIVE AVAILABILITY: <span style="color:#fff">${available}</span> SEATS REMAINING`;
            submitBtn.disabled = false;
            submitBtn.innerText = "CONFIRM RESERVATION";
        }
    } catch(e) { statusText.innerText = "8 SEATS AVAILABLE"; submitBtn.disabled = false; }
}

document.addEventListener('DOMContentLoaded', () => {
    if(window.lucide) lucide.createIcons();
    
    document.getElementById('regForm')?.addEventListener('submit', async function(e) {
        e.preventDefault();
        const btn = document.getElementById('submit-btn');
        btn.disabled = true;
        btn.innerText = "SECURING SEAT...";

        const data = {
            "Name": document.getElementById('name').value,
            "Phone": document.getElementById('phone').value,
            "Email": document.getElementById('email').value,
            "Country": document.getElementById('country').value,
            "City": document.getElementById('city').value,
            "Location": document.getElementById('location').value,
            "Registration Date": new Date().toLocaleDateString()
        };

        try {
            await fetch(API_URL, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ data: [data] })
            });
            btn.innerText = "SUCCESSFUL";
            this.reset();
            setTimeout(() => { showSection('home'); btn.innerText = "CONFIRM RESERVATION"; btn.disabled = false; }, 2000);
        } catch(e) { btn.disabled = false; btn.innerText = "TRY AGAIN"; }
    });
});
