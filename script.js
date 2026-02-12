const menuToggle = document.getElementById('menu-toggle');
const navLinks = document.getElementById('nav-links');

menuToggle.addEventListener('click', () => {
    navLinks.classList.toggle('active-menu');
});

function showSection(id, btn) {
    document.querySelectorAll('.section-container, #home-wrapper').forEach(el => {
        el.style.display = 'none';
    });
    
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

const capacityMap = { 
    "Bole": 8, "Mexico": 8, "Megenagna": 8, "Haile Garment": 8, 
    "Piassa": 8, "Old Airport": 8, "CMC": 8, "Sar Bet": 8, "Downtown": 8 
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

function checkSlots() {
    const loc = document.getElementById('location').value;
    const badge = document.getElementById('slot-badge');
    const count = document.getElementById('slot-count');
    const available = capacityMap[loc] || 8;
    badge.classList.remove('hidden');
    count.innerText = available;
}

document.addEventListener("DOMContentLoaded", () => {
    lucide.createIcons();
    const now = new Date();
    document.getElementById("regDate").value = now.toLocaleDateString();
    document.getElementById("regTime").value = now.toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'});
});

document.getElementById('regForm').addEventListener('submit', function(e) {
    e.preventDefault();
    const btn = document.getElementById('submit-btn');
    const formData = {
        name: document.getElementById('name').value,
        email: document.getElementById('email').value,
        phone: document.getElementById('phone').value,
        country: document.getElementById('country').value,
        city: document.getElementById('city').value,
        location: document.getElementById('location').value,
        date: document.getElementById('regDate').value,
        time: document.getElementById('regTime').value
    };

    btn.disabled = true; btn.innerText = "SENDING...";

    fetch('https://sheetdb.io/api/v1/9q45d3e7oe5ks', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ data: [formData] })
    })
    .then(res => {
        if(res.ok) {
            const msg = `*NEW REGISTRATION*%0A*Name:* ${formData.name}%0A*City:* ${formData.city}%0A*Location:* ${formData.location}`;
            window.open(`https://wa.me/251910884585?text=${msg}`, '_blank');
            this.reset();
            showSection('home');
            btn.disabled = false; btn.innerText = "CONFIRM RESERVATION";
        }
    });
});
