const menuToggle = document.getElementById('menu-toggle');
const navLinks = document.getElementById('nav-links');

/* --- SERMON DATA: AUTHENTIC CONTENT INJECTED --- */
const sermons = [
    {
        id: "UQM5zM8XIaw",
        title: "ወጣቱ ባለሃብት!",
        description: "The cost of the Kingdom and why you can't play 50/50 with God.",
        date: "Feb 7, 2026",
        category: "Kingdom Culture"
    },
    {
        id: "Q7p0wt29a04",
        title: "በሰማርያም ሊያልፍ ግድ ሆነበት!",
        description: "Breaking barriers and finding the 'Living Water' that actually satisfies.",
        date: "Jan 31, 2026",
        category: "Identity"
    },
    {
        id: "uoUSXNjBgAg",
        title: "ለውጥ እና ፈተናው!",
        description: "Why pressure is a package deal with change. Choose purpose over panic.",
        date: "Jan 24, 2026",
        category: "Growth"
    }
];

menuToggle.addEventListener('click', (e) => {
    e.stopPropagation();
    navLinks.classList.toggle('active-menu');
});

function showSection(id, btn) {
    document.querySelectorAll('.section-container, #home-wrapper').forEach(el => el.style.display = 'none');
    const target = (id === 'home') ? document.getElementById('home-wrapper') : document.getElementById(id);
    if(target) target.style.display = 'block';
    document.querySelectorAll('.nav-links button').forEach(b => b.classList.remove('active'));
    if (btn) btn.classList.add('active');
    navLinks.classList.remove('active-menu');
    window.scrollTo(0,0);
}

/* --- SURGICAL REPAIR: MOBILE-FIRST VIDEO LOGIC --- */
function openVideo(videoId) {
    const overlay = document.createElement('div');
    overlay.style = "position:fixed; top:0; left:0; width:100%; height:100%; background:rgba(0,0,0,0.98); z-index:10000; display:flex; align-items:center; justify-content:center; padding:10px;";
    
    overlay.innerHTML = `
        <div style="position:relative; width:100%; max-width:850px; aspect-ratio:16/9; background:#000; box-shadow: 0 0 50px rgba(0,0,0,1);">
            <button onclick="this.parentElement.parentElement.remove()" 
                    style="position:absolute; top:-45px; right:0; color:#FCA311; background:none; border:none; font-family:'Oswald'; font-size:14px; font-weight:700; cursor:pointer; letter-spacing:2px; padding:10px;">
                CLOSE [X]
            </button>
            <iframe 
                width="100%" 
                height="100%" 
                src="https://www.youtube-nocookie.com/embed/${videoId}?autoplay=1&rel=0&modestbranding=1&playsinline=1" 
                frameborder="0" 
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" 
                allowfullscreen>
            </iframe>
        </div>
    `;
    document.body.appendChild(overlay);
}

const db = {
    "Ethiopia": { 
        "Addis Ababa": ["Bole", "Mexico", "Megenagna", "Haile Garment", "Piassa", "Old Airport", "CMC", "Sar Bet"],
        "Hawassa": ["Downtown"], "Dire Dawa": ["Downtown"]
    },
    "Germany": { "Berlin": ["Downtown"], "Frankfurt": ["Downtown"], "Munich": ["Downtown"] },
    "South Africa": { "Cape Town": ["Downtown"], "Johannesburg": ["Downtown"] },
    "Sweden": { "Stockholm": ["Downtown"] },
    "Netherlands": { "Amsterdam": ["Downtown"] },
    "USA": { "Dallas": ["Downtown"], "New York": ["Downtown"] },
    "UK": { "London": ["Downtown"] },
    "Kenya": { "Nairobi": ["Downtown"] }
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
    if (db[country] && db[country][city]) {
        db[country][city].forEach(l => locSelect.add(new Option(l, l)));
    }
}

async function checkSlots() {
    const loc = document.getElementById('location').value;
    const badge = document.getElementById('slot-badge');
    const countSpan = document.getElementById('slot-count');
    const btn = document.getElementById('submit-btn');
    if(!loc) return;
    badge.classList.remove('hidden');
    countSpan.innerText = "...";
    btn.disabled = true;
    try {
        const response = await fetch(`https://sheetdb.io/api/v1/9q45d3e7oe5ks?t=${Date.now()}`);
        const data = await response.json();
        const bookings = data.filter(row => row.Location && row.Location.toString().trim().toLowerCase() === loc.trim().toLowerCase()).length;
        const available = 8 - bookings;
        countSpan.innerText = available > 0 ? available : 0;
        if (available <= 0) {
            btn.innerText = "FULLY BOOKED";
            btn.disabled = true;
        } else {
            btn.innerText = "CONFIRM RESERVATION";
            btn.disabled = false;
        }
    } catch (error) {
        countSpan.innerText = "8";
        btn.disabled = false;
    }
}

document.getElementById('regForm').addEventListener('submit', async function(e) {
    e.preventDefault();
    const btn = document.getElementById('submit-btn');
    const formData = {
        'Name': document.getElementById('name').value,
        'Phone': document.getElementById('phone').value,
        'Email': document.getElementById('email').value,
        'Country': document.getElementById('country').value,
        'City': document.getElementById('city').value,
        'Location': document.getElementById('location').value,
        'Registration Date': new Date().toLocaleDateString(),
        'Registration Time': new Date().toLocaleTimeString()
    };
    btn.disabled = true;
    btn.innerText = "RESERVING...";
    try {
        const response = await fetch('https://sheetdb.io/api/v1/9q45d3e7oe5ks', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ data: [formData] })
        });
        if (response.ok) {
            const msg = `*NEW REGISTRATION*%0A*Name:* ${formData.Name}%0A*City:* ${formData.City}%0A*Location:* ${formData.Location}`;
            this.reset();
            document.getElementById('slot-badge').classList.add('hidden');
            showSection('home');
            setTimeout(() => {
                window.location.href = `https://wa.me/251910884585?text=${msg}`;
            }, 600);
        }
    } catch (error) {
        btn.disabled = false;
        btn.innerText = "RETRY";
    }
});

document.addEventListener("DOMContentLoaded", () => lucide.createIcons());
