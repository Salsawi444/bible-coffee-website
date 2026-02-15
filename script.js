/* --- CONFIGURATION & DATABASE --- */
const API_URL = 'https://sheetdb.io/api/v1/9q45d3e7oe5ks';

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

/* --- NAVIGATION LOGIC (FIXED) --- */
function showSection(id, btn) {
    const sections = ['home-wrapper', 'magazine', 'merch', 'sermon', 'events', 'support', 'join'];
    const marquee = document.querySelector('.hero-marquee');
    const manifesto = document.getElementById('manifesto');

    sections.forEach(sectionId => {
        const el = document.getElementById(sectionId);
        if (el) {
            el.style.setProperty('display', 'none', 'important');
            el.classList.add('hidden');
        }
    });

    if (id === 'home') {
        const wrapper = document.getElementById('home-wrapper');
        if (wrapper) {
            wrapper.style.setProperty('display', 'block', 'important');
            wrapper.classList.remove('hidden');
        }
        if (marquee) marquee.style.display = 'block';
        if (manifesto) {
            manifesto.style.setProperty('display', 'block', 'important');
            manifesto.classList.remove('hidden');
        }
    } else {
        const target = document.getElementById(id);
        if (target) {
            target.style.setProperty('display', 'block', 'important');
            target.classList.remove('hidden');
        }
        if (marquee) marquee.style.display = 'none';
        if (manifesto) manifesto.style.display = 'none';
    }

    document.querySelectorAll('.nav-links button').forEach(b => b.classList.remove('active'));
    if (btn) btn.classList.add('active');

    const navLinks = document.getElementById('nav-links');
    if (navLinks) navLinks.classList.remove('active-menu');

    window.scrollTo({ top: 0, behavior: 'smooth' });
}

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

/* --- FORM HELPERS --- */
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

/* --- LIVE SLOT CHECKER --- */
async function checkSlots() {
    const loc = document.getElementById('location').value;
    const badge = document.getElementById('slot-badge');
    const statusText = document.getElementById('slot-status-text');
    const submitBtn = document.getElementById('submit-btn');
    if(!loc) return;
    if(badge) { badge.classList.remove('hidden'); badge.style.display = 'block'; }
    if(statusText) statusText.innerHTML = `<span style="letter-spacing:2px; color: #aaa;">VERIFYING...</span>`;
    submitBtn.disabled = true;
    try {
        const res = await fetch(API_URL);
        const data = await res.json();
        const taken = data.filter(r => r.Location === loc).length;
        const available = 8 - taken;
        if (available <= 0) {
            statusText.innerHTML = `<span style="color: #ff4444; font-weight: bold;">LOCATION FULL</span>`;
            submitBtn.innerText = "NO SEATS REMAINING";
        } else {
            statusText.innerHTML = `LIVE AVAILABILITY: <span style="color: #fff;">${available}</span> SEATS REMAINING`;
            submitBtn.disabled = false;
            submitBtn.innerText = "CONFIRM RESERVATION";
        }
    } catch(e) { 
        statusText.innerText = "CONNECTION ERROR.";
        submitBtn.disabled = false;
    }
}

/* --- HOST MODAL LOGIC --- */
function toggleHostModal() {
    const modal = document.getElementById('hostModal');
    if (modal) {
        modal.classList.toggle('hidden');
        if (!modal.classList.contains('hidden')) {
            modal.style.display = 'flex';
            if (window.lucide) lucide.createIcons();
        } else {
            modal.style.display = 'none';
        }
    }
}

/* --- INITIALIZE & EVENT LISTENERS --- */
document.addEventListener('DOMContentLoaded', () => {
    if(window.lucide) lucide.createIcons();

    const menuToggle = document.getElementById('menu-toggle');
    const navLinks = document.getElementById('nav-links');

    if (menuToggle) {
        menuToggle.addEventListener('click', (e) => {
            e.preventDefault();
            e.stopPropagation();
            navLinks.classList.toggle('active-menu');
        });
    }

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
                btn.innerText = "RESERVATION SECURED";
                this.reset();
                setTimeout(() => showSection('home'), 3000);
            }
        } catch (err) {
            btn.disabled = false;
            btn.innerText = "CONFIRM RESERVATION";
            alert("Error connecting to server.");
        }
    });

    // Handle Host Form Submission
   /* --- FINAL WHATSAPP MESSAGE LOGIC --- */
document.getElementById('hostForm').addEventListener('submit', function(e) {
    e.preventDefault();

    // Get the exact data from your fields
    const name = document.getElementById('hostName').value;
    const country = document.getElementById('hostCountry').value;
    const city = document.getElementById('hostCity').value;
    const phone = document.getElementById('hostPhone').value;

    // Building your exact requested format with line breaks
    const message = `Hello my name is ${name} here are my details\n` +
                    `Country: ${country}\n` +
                    `City: ${city}\n` +
                    `Phone: ${phone}`;
    
    // Open WhatsApp with the formatted text
    const whatsappUrl = `https://wa.me/251910884585?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');
    
    if (typeof toggleHostModal === "function") {
        toggleHostModal();
    }
});


/* --- WHATSAPP MESSAGE LOGIC --- */
document.getElementById('hostForm').addEventListener('submit', function(e) {
    e.preventDefault();

    // Pulling the data from your fields
    const name = document.getElementById('hostName').value;
    const country = document.getElementById('hostCountry').value;
    const city = document.getElementById('hostCity').value;
    const venue = document.getElementById('hostVenue').value;

    // Your exact requested message format
    const message = `Hello my name is ${name}. I'm interested to host Bible and Coffee. Here is my detail: Country: ${country}, City: ${city}, Location: ${venue}.`;
    
    // Redirect to WhatsApp with the formatted text
    const whatsappUrl = `https://wa.me/251910884584?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');
    
    // Close the modal after submission
    if (typeof toggleHostModal === "function") {
        toggleHostModal();
    }
});
