const menuToggle = document.getElementById('menu-toggle');
const navLinks = document.getElementById('nav-links');

/* --- SERMON DATA --- */
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

/* --- MERCH LOGIC --- */
function orderMerch(itemName) {
    const phone = "251910884585";
    const message = encodeURIComponent(`Hi Bible & Coffee, I am interested in the ${itemName} from the collection.`);
    window.location.href = `https://wa.me/${phone}?text=${message}`;
}

/* --- MOBILE MENU TOGGLE --- */
if (menuToggle) {
    menuToggle.addEventListener('click', (e) => {
        e.stopPropagation();
        navLinks.classList.toggle('active-menu');
    });
}

/* --- SECTION SWITCHER (SURGICAL REPAIR) --- */
function showSection(id, btn) {
    // 1. Target the specific sections we want to manage
    // We target IDs directly to ensure they are found regardless of class
    const sectionIds = ['home-wrapper', 'magazine', 'merch', 'sermon', 'events', 'support', 'join'];
    
    sectionIds.forEach(sectionId => {
        const el = document.getElementById(sectionId);
        if(el) {
            el.style.display = 'none';
        }
    });

    // 2. Map 'home' to 'home-wrapper' specifically
    const targetId = (id === 'home') ? 'home-wrapper' : id;
    const target = document.getElementById(targetId);
    
    if(target) {
        // Force display block and use !important to override any tailwind hidden classes
        target.style.setProperty('display', 'block', 'important');
    }

    // 3. UI Cleanup: Update button highlighting
    document.querySelectorAll('.nav-links button').forEach(b => b.classList.remove('active'));
    if (btn) btn.classList.add('active');
    
    // 4. Close mobile menu
    if(navLinks) navLinks.classList.remove('active-menu');
    
    // 5. Reset scroll
    window.scrollTo(0,0);
}

/* --- VIDEO LOGIC --- */
function openVideo(videoId) {
    const overlay = document.createElement('div');
    overlay.style = "position:fixed; top:0; left:0; width:100%; height:100%; background:rgba(0,0,0,0.98); z-index:10000; display:flex; align-items:center; justify-content:center; padding:10px;";
    
    overlay.innerHTML = `
        <div style="position:relative; width:100%; max-width:850px; aspect-ratio:16/9; background:#000; box-shadow: 0 0 50px rgba(0,0,0,1);">
            <button onclick="this.parentElement.parentElement.remove()" 
                    style="position:absolute; top:-45px; right:0; color:#FCA311; background:none; border:none; font-family:'Oswald'; font-size:14px; font-weight:700; cursor:pointer; letter-spacing:2px; padding:10px;">
                CLOSE [X]
            </button>
            <iframe width="100%" height="100%" src="https://www.youtube-nocookie.com/embed/${videoId}?autoplay=1&rel=0&modestbranding=1&playsinline=1" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>
        </div>
    `;
    document.body.appendChild(overlay);
}

/* --- REGISTRATION DATABASE --- */
const db = {
    "Ethiopia": { 
        "Addis Ababa": ["Bole", "Mexico", "Megenagna", "Haile Garment", "Piassa", "Old Airport", "CMC", "Sar Bet"],
        "Hawassa": ["City Center", "Lake Front"], 
        "Dire Dawa": ["Kezira", "Taiwan"], 
        "Bahir Dar": ["Piazza", "Shoreline"]
    },
    "Kenya": { "Nairobi": ["Kilimani", "Westlands", "Karen", "CBD"], "Mombasa": ["Nyali", "Old Town"] },
    "Uganda": { "Kampala": ["Kololo", "Nakasero", "Kiwatule"], "Entebbe": ["Victoria Side"] },
    "Rwanda": { "Kigali": ["Kiyovu", "Kimihurura", "Nyabugogo"] },
    "South Africa": { "Johannesburg": ["Sandton", "Rosebank", "Soweto"], "Cape Town": ["Waterfront", "Sea Point"] },
    "Germany": { "Berlin": ["Mitte", "Kreuzberg"], "Frankfurt": ["Innenstadt"], "Munich": ["Altstadt"] },
    "Netherlands": { "Amsterdam": ["Centrum", "Zuid"], "Rotterdam": ["Coolsingel"] },
    "Sweden": { "Stockholm": ["Norrmalm", "Södermalm", "Östermalm"] },
    "Norway": { "Oslo": ["Sentrum", "Grünerløkka"] },
    "Denmark": { "Copenhagen": ["Vesterbro", "Nørrebro"] },
    "USA": { "Dallas": ["Downtown", "Plano", "Frisco"], "New York": ["Manhattan", "Brooklyn", "Queens"] },
    "UK": { "London": ["Canary Wharf", "Westminster", "Shoreditch"], "Manchester": ["City Centre"] }
};

function updateCities() {
    const country = document.getElementById('country').value;
    const citySelect = document.getElementById('city');
    const locSelect = document.getElementById('location');
    if(!citySelect) return;
    citySelect.innerHTML = '<option value="" disabled selected></option>';
    if(locSelect) locSelect.innerHTML = '<option value="" disabled selected></option>';
    if (db[country]) Object.keys(db[country]).forEach(c => citySelect.add(new Option(c, c)));
}

function updateLocations() {
    const country = document.getElementById('country').value;
    const city = document.getElementById('city').value;
    const locSelect = document.getElementById('location');
    if(!locSelect) return;
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
    if(!loc || !badge) return;
    
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

/* --- REGISTRATION SUBMIT --- */
const regForm = document.getElementById('regForm');
if(regForm) {
    regForm.addEventListener('submit', async function(e) {
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
                if(document.getElementById('slot-badge')) document.getElementById('slot-badge').classList.add('hidden');
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
}

/* --- DOM INIT --- */
document.addEventListener("DOMContentLoaded", () => {
    if(window.lucide) {
        lucide.createIcons();
    }
    
    const merchItems = document.querySelectorAll('.merch-card-v2');
    if (merchItems.length > 0) {
        merchItems.forEach(card => {
            card.addEventListener('click', () => {
                const titleEl = card.querySelector('h3');
                if (titleEl) orderMerch(titleEl.innerText);
            });
        });
    }
});
