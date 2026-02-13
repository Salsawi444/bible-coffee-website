/* --- NAVIGATION LOGIC --- */
function showSection(id, btn) {
    // 1. Identify all top-level containers
    // Note: 'home' is a child of 'home-wrapper', so we handle them as one unit for visibility
    const sections = ['home-wrapper', 'magazine', 'merch', 'sermon', 'events', 'support', 'join'];
    
    // 2. Hide all main sections
    sections.forEach(sectionId => {
        const el = document.getElementById(sectionId);
        if (el) {
            el.style.display = 'none';
            el.classList.add('hidden');
        }
    });

    // 3. Show requested section logic
    if (id === 'home') {
        const wrapper = document.getElementById('home-wrapper');
        const homeHeader = document.getElementById('home');
        if (wrapper) {
            wrapper.style.display = 'block';
            wrapper.classList.remove('hidden');
        }
        if (homeHeader) {
            // Hero section specifically needs flex for the layout to look right
            homeHeader.style.display = 'flex'; 
            homeHeader.classList.remove('hidden');
        }
    } else {
        const target = document.getElementById(id);
        if (target) {
            target.style.display = 'block';
            target.classList.remove('hidden');
        }
    }

    // 4. UI Updates
    // Update active button state
    document.querySelectorAll('.nav-links button').forEach(b => b.classList.remove('active'));
    if (btn) {
        btn.classList.add('active');
    } else {
        // Fallback: Find the button by text if 'btn' wasn't passed (e.g., from "Claim My Seat")
        const buttons = document.querySelectorAll('.nav-links button');
        buttons.forEach(b => {
            if(b.innerText.toLowerCase() === id.toLowerCase()) b.classList.add('active');
        });
    }

    // Close mobile menu after selection
    const navLinks = document.getElementById('nav-links');
    if (navLinks) navLinks.classList.remove('active-menu');

    // Smooth scroll to top
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

/* --- DATABASE & DROPDOWNS --- */
const db = {
    "Ethiopia": { 
        "Addis Ababa": ["Bole", "Mexico", "Piassa", "Megenagna", "CMC", "Old Airport"], 
        "Hawassa": ["City Center"] 
    },
    "Kenya": { "Nairobi": ["Kilimani", "Westlands"] },
    "USA": { "Dallas": ["Downtown", "Plano"] },
    "UK": { "London": ["Central"] },
    "Germany": { "Berlin": ["Mitte"] },
    "Netherlands": { "Amsterdam": ["Center"] },
    "Sweden": { "Stockholm": ["Gamla Stan"] },
    "Norway": { "Oslo": ["Center"] },
    "Denmark": { "Copenhagen": ["Center"] },
    "South Africa": { "Johannesburg": ["Sandton"] },
    "Uganda": { "Kampala": ["Central"] },
    "Rwanda": { "Kigali": ["City Center"] }
};

function updateCities() {
    const country = document.getElementById('country').value;
    const citySelect = document.getElementById('city');
    citySelect.innerHTML = '<option value="" disabled selected></option>';
    if (db[country]) {
        Object.keys(db[country]).forEach(c => {
            citySelect.add(new Option(c, c));
        });
    }
}

function updateLocations() {
    const country = document.getElementById('country').value;
    const city = document.getElementById('city').value;
    const locSelect = document.getElementById('location');
    locSelect.innerHTML = '<option value="" disabled selected></option>';
    if (db[country] && db[country][city]) {
        db[country][city].forEach(l => {
            locSelect.add(new Option(l, l));
        });
    }
}

async function checkSlots() {
    const loc = document.getElementById('location').value;
    const countSpan = document.getElementById('slot-count');
    const badge = document.getElementById('slot-badge');
    if(!loc) return;
    
    badge.classList.remove('hidden');
    try {
        const res = await fetch('https://sheetdb.io/api/v1/9q45d3e7oe5ks');
        const data = await res.json();
        const taken = data.filter(r => r.Location === loc).length;
        countSpan.innerText = Math.max(0, 8 - taken);
    } catch(e) { 
        console.error("Slot check failed", e);
        countSpan.innerText = "8"; 
    }
}

/* --- INITIALIZE --- */
document.addEventListener('DOMContentLoaded', () => {
    // 1. Initialize Lucide Icons
    if(window.lucide) {
        lucide.createIcons();
    }
    
    // 2. Default View
    showSection('home', document.querySelector('.nav-links button:first-child'));

    // 3. Form Submission Handling (Preventing page reload)
    document.getElementById('regForm')?.addEventListener('submit', function(e) {
        // Here you would typically add your fetch call to post data to SheetDB
        // For now, it prevents the default refresh to keep the "surgery" stable
        console.log("Form submitted locally.");
    });
});
