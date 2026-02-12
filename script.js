const menuToggle = document.getElementById('menu-toggle');
const navLinks = document.getElementById('nav-links');
menuToggle.addEventListener('click', () => navLinks.classList.toggle('active-menu'));

function showSection(id, btn) {
    document.querySelectorAll('.section-container, #home-wrapper').forEach(el => el.style.display = 'none');
    if (id === 'home') document.getElementById('home-wrapper').style.display = 'block';
    else document.getElementById(id).style.display = 'block';
    document.querySelectorAll('.nav-links button').forEach(b => b.classList.remove('active'));
    if (btn) btn.classList.add('active');
    navLinks.classList.remove('active-menu');
    window.scrollTo({top: 0, behavior: 'smooth'});
}

const db = {
    "Ethiopia": { 
        "Addis Ababa": ["Bole", "Mexico", "Megenagna", "Haile Garment", "Piassa", "Old Airport", "CMC", "Sar Bet"],
        "Hawassa": ["Downtown"], "Dire Dawa": ["Downtown"], "Mekelle": ["Downtown"], "Bahir Dar": ["Downtown"]
    },
    "Germany": { "Berlin": ["Downtown"], "Frankfurt": ["Downtown"], "Munich": ["Downtown"], "Hamburg": ["Downtown"] },
    "South Africa": { "Cape Town": ["Downtown"], "Johannesburg": ["Downtown"] },
    "Sweden": { "Stockholm": ["Downtown"], "Gothenburg": ["Downtown"] },
    "Netherlands": { "Amsterdam": ["Downtown"], "Rotterdam": ["Downtown"] },
    "USA": { "Dallas": ["Downtown"], "New York": ["Downtown"] },
    "UK": { "London": ["Downtown"], "Manchester": ["Downtown"] },
    "Kenya": { "Nairobi": ["Downtown"], "Mombasa": ["Downtown"] }
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
    const btn = document.getElementById('submit-btn');
    const err = document.getElementById('error-message');
    const available = capacityMap[loc] !== undefined ? capacityMap[loc] : 8;
    badge.classList.remove('hidden');
    count.innerText = available;
    if (available <= 0) {
        btn.disabled = true; btn.innerText = "FULLY BOOKED"; btn.style.opacity = "0.5";
        err.innerHTML = "THIS LOCATION IS FULL."; err.classList.remove('hidden');
    } else {
        btn.disabled = false; btn.style.opacity = "1"; btn.innerText = "CONFIRM REGISTRATION"; err.classList.add('hidden');
    }
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
    btn.disabled = true; btn.innerText = "PROCESSING...";
    fetch('https://sheetdb.io/api/v1/9q45d3e7oe5ks', {
        method: 'POST',
        headers: { 'Accept': 'application/json', 'Content-Type': 'application/json' },
        body: JSON.stringify({ data: [formData] })
    })
    .then(res => {
        if(res.ok) {
            btn.innerText = "SUCCESSFUL!";
            const msg = `*NEW REGISTRATION*%0A%0A*Name:* ${formData.name}%0A*City:* ${formData.city}%0A*Location:* ${formData.location}`;
            setTimeout(() => {
                window.open(`https://wa.me/251910884585?text=${msg}`, '_blank');
                this.reset(); showSection('home');
                btn.disabled = false; btn.innerText = "CONFIRM REGISTRATION";
            }, 1500);
        }
    }).catch(() => { btn.disabled = false; btn.innerText = "RETRY"; });
});
