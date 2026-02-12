const menuToggle = document.getElementById('menu-toggle');
const navLinks = document.getElementById('nav-links');

/* --- NAVIGATION LOGIC --- */
function showSection(id, btn) {
    // Hide ALL wrappers and containers using FORCE
    document.querySelectorAll('.section-container, #home-wrapper').forEach(el => {
        el.style.setProperty('display', 'none', 'important');
    });

    // Identify and show target
    const target = (id === 'home') ? document.getElementById('home-wrapper') : document.getElementById(id);
    if(target) {
        target.style.setProperty('display', 'block', 'important');
    }

    // UI Updates
    document.querySelectorAll('.nav-links button').forEach(b => b.classList.remove('active'));
    const activeBtn = btn || document.querySelector(`.nav-links button[onclick*="'${id}'"]`);
    if (activeBtn) activeBtn.classList.add('active');
    
    navLinks.classList.remove('active-menu');
    window.scrollTo(0,0);
}

menuToggle.addEventListener('click', () => navLinks.classList.toggle('active-menu'));

/* --- SERMON DATA & RENDER --- */
const sermons = [
    { id: "UQM5zM8XIaw", title: "ወጣቱ ባለሃብት!", date: "Feb 7, 2026" },
    { id: "Q7p0wt29a04", title: "በሰማርያም ሊያልፍ ግድ ሆነበት!", date: "Jan 31, 2026" },
    { id: "uoUSXNjBgAg", title: "ለውጥ እና ፈተናው!", date: "Jan 24, 2026" }
];

function renderSermons() {
    const container = document.getElementById('sermon-container');
    if(!container) return;
    container.innerHTML = sermons.map(s => `
        <div class="cursor-pointer" onclick="openVideo('${s.id}')">
            <div class="aspect-video bg-gray-900 mb-4 overflow-hidden">
                <img src="https://img.youtube.com/vi/${s.id}/maxresdefault.jpg" class="w-full hover:scale-105 transition duration-700">
            </div>
            <h3 class="font-bold text-lg">${s.title}</h3>
            <p class="text-sm text-gray-500">${s.date}</p>
        </div>
    `).join('');
}

function openVideo(videoId) {
    const overlay = document.createElement('div');
    overlay.style = "position:fixed; top:0; left:0; width:100%; height:100%; background:rgba(0,0,0,0.98); z-index:10000; display:flex; align-items:center; justify-content:center; padding:10px;";
    overlay.innerHTML = `
        <div style="position:relative; width:100%; max-width:850px; aspect-ratio:16/9; background:#000;">
            <button onclick="this.parentElement.parentElement.remove()" style="position:absolute; top:-40px; right:0; color:#FCA311; font-weight:900;">CLOSE [X]</button>
            <iframe width="100%" height="100%" src="https://www.youtube-nocookie.com/embed/${videoId}?autoplay=1" frameborder="0" allowfullscreen></iframe>
        </div>`;
    document.body.appendChild(overlay);
}

/* --- REGISTRATION LOGIC (GOLDEN CODE) --- */
const db = {
    "Ethiopia": { "Addis Ababa": ["Bole", "Mexico", "Megenagna", "Haile Garment", "Piassa", "Old Airport", "CMC", "Sar Bet"] },
    "USA": { "Dallas": ["Downtown"], "New York": ["Downtown"] }
};

function updateCities() {
    const country = document.getElementById('country').value;
    const citySelect = document.getElementById('city');
    citySelect.innerHTML = '<option value="" disabled selected>City</option>';
    if (db[country]) Object.keys(db[country]).forEach(c => citySelect.add(new Option(c, c)));
}

function updateLocations() {
    const country = document.getElementById('country').value;
    const city = document.getElementById('city').value;
    const locSelect = document.getElementById('location');
    locSelect.innerHTML = '<option value="" disabled selected>Location</option>';
    if (db[country] && db[country][city]) db[country][city].forEach(l => locSelect.add(new Option(l, l)));
}

async function checkSlots() {
    const loc = document.getElementById('location').value;
    const countSpan = document.getElementById('slot-count');
    const btn = document.getElementById('submit-btn');
    document.getElementById('slot-badge').classList.remove('hidden');
    
    try {
        const res = await fetch(`https://sheetdb.io/api/v1/9q45d3e7oe5ks`);
        const data = await res.json();
        const count = data.filter(r => r.Location === loc).length;
        const avail = 8 - count;
        countSpan.innerText = avail > 0 ? avail : 0;
        btn.disabled = avail <= 0;
        if(avail <= 0) btn.innerText = "FULLY BOOKED";
    } catch(e) { countSpan.innerText = "8"; }
}

document.getElementById('regForm')?.addEventListener('submit', async function(e) {
    e.preventDefault();
    const btn = document.getElementById('submit-btn');
    btn.innerText = "RESERVING...";
    const data = {
        'Name': document.getElementById('name').value,
        'Location': document.getElementById('location').value,
        'Registration Date': new Date().toLocaleDateString()
    };
    await fetch('https://sheetdb.io/api/v1/9q45d3e7oe5ks', {
        method: 'POST', headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({data: [data]})
    });
    window.location.href = `https://wa.me/251910884585?text=New Registration: ${data.Name}`;
});

document.addEventListener("DOMContentLoaded", () => {
    renderSermons();
    if(window.lucide) lucide.createIcons();
});
