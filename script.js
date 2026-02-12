const menuToggle = document.getElementById('menu-toggle');
const navLinks = document.getElementById('nav-links');

// Toggle Menu
menuToggle.addEventListener('click', (e) => {
    e.stopPropagation();
    navLinks.classList.toggle('active-menu');
});

// Section Switcher
function showSection(id, btn) {
    document.querySelectorAll('.section-container, #home-wrapper').forEach(el => el.style.display = 'none');
    const target = (id === 'home') ? document.getElementById('home-wrapper') : document.getElementById(id);
    if(target) target.style.display = 'block';
    document.querySelectorAll('.nav-links button').forEach(b => b.classList.remove('active'));
    if (btn) btn.classList.add('active');
    navLinks.classList.remove('active-menu');
    window.scrollTo(0,0);
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

const capacityMap = { "Bole": 8, "Mexico": 8, "Megenagna": 8, "Haile Garment": 8, "Piassa": 8, "Old Airport": 8, "CMC": 8, "Sar Bet": 8, "Downtown": 8 };

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

// LIVE COUNTDOWN LOGIC
async function checkSlots() {
    const loc = document.getElementById('location').value;
    const badge = document.getElementById('slot-badge');
    const countSpan = document.getElementById('slot-count');
    const btn = document.getElementById('submit-btn');
    
    badge.classList.remove('hidden');
    countSpan.innerText = "...";

    try {
        // Fetches only entries that match the chosen location
        const response = await fetch(`https://sheetdb.io/api/v1/9q45d3e7oe5ks/search?Location=${loc}`);
        const data = await response.json();
        
        const totalCapacity = 8;
        const bookings = data.length; 
        const available = totalCapacity - bookings;

        countSpan.innerText = available > 0 ? available : 0;

        if (available <= 0) {
            btn.disabled = true;
            btn.innerText = "FULLY BOOKED";
            btn.style.background = "#333";
        } else {
            btn.disabled = false;
            btn.innerText = "CONFIRM RESERVATION";
            btn.style.background = "#FCA311";
        }
    } catch (error) {
        countSpan.innerText = "8"; 
    }
}

// Form Submission Workflow
document.getElementById('regForm').addEventListener('submit', async function(e) {
    e.preventDefault();
    const btn = document.getElementById('submit-btn');
    
    const formData = {
        'Name': document.getElementById('name').value,
        'Email': document.getElementById('email').value,
        'Phone': document.getElementById('phone').value,
        'Country': document.getElementById('country').value,
        'City': document.getElementById('city').value,
        'Location': document.getElementById('location').value,
        'Registration Date': new Date().toLocaleDateString(),
        'Registration Time': new Date().toLocaleTimeString()
    };

    btn.disabled = true;
    btn.innerText = "HOLD ON...";

    try {
        const response = await fetch('https://sheetdb.io/api/v1/9q45d3e7oe5ks', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ data: [formData] })
        });

        if (response.ok) {
            btn.innerText = "RESERVED!";
            btn.style.background = "#22c55e";
            
            const msg = `*NEW REGISTRATION*%0A*Name:* ${formData.Name}%0A*Location:* ${formData.Location}%0A*City:* ${formData.City}`;
            
            // TAKE USER HOME IMMEDIATELY
            showSection('home');
            
            // RESET FORM
            this.reset();
            document.getElementById('slot-badge').classList.add('hidden');

            // OPEN WHATSAPP (Mobile Friendly)
            setTimeout(() => {
                window.location.href = `https://wa.me/251910884585?text=${msg}`;
            }, 600);
        }
    } catch (error) {
        btn.disabled = false;
        btn.innerText = "RETRY";
    }
});

document.addEventListener("DOMContentLoaded", () => {
    lucide.createIcons();
});
