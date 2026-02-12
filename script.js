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
        "Hawassa": ["Lake Side", "Piazza", "Mobile Sefer"], 
        "Dire Dawa": ["Kezira", "Ashawa"], 
        "Mekelle": ["Romanat", "Adi Haki"],
        "Bahir Dar": ["Tana", "Piazza"]
    },
    "South Africa": { "Cape Town": ["Waterfront", "Sea Point"], "Johannesburg": ["Sandton", "Soweto"] },
    "Sweden": { "Stockholm": ["Gamla Stan", "Södermalm"], "Gothenburg": ["City Center"] },
    "Netherlands": { "Amsterdam": ["Centrum", "De Pijp"], "Rotterdam": ["Erasmus"] },
    "USA": { "Dallas": ["Uptown", "Downtown"], "New York": ["Brooklyn", "Manhattan"] },
    "UK": { "London": ["Soho", "Paddington"], "Manchester": ["Center"] },
    "Kenya": { "Nairobi": ["Westlands", "Kilimani"], "Mombasa": ["Nyali"] }
};

const capacityMap = { 
    "Bole": 8, "Mexico": 8, "Megenagna": 8, "Haile Garment": 8, 
    "Piassa": 8, "Old Airport": 8, "CMC": 8, "Sar Bet": 8 
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
    } else {
        locSelect.add(new Option("General Gathering", "General"));
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
        err.innerHTML = "THIS LOCATION IS FULL.<br>CHOOSE ANOTHER AREA OR CONTACT US."; err.classList.remove('hidden');
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
    const err = document.getElementById('error-message');
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
        body: JSON.stringify({
            data: [{
                'Name': formData.name, 'Email': formData.email, 'Phone': formData.phone,
                'Country': formData.country, 'City': formData.city, 'Location': formData.location,
                'Registration Date': formData.date, 'Registration Time': formData.time
            }]
        })
    })
    .then(res => {
        if(res.ok) {
            btn.innerText = "SUCCESSFUL!"; btn.style.background = "#22c55e";
            const msg = `*NEW REGISTRATION*%0A%0A*Name:* ${formData.name}%0A*Phone:* ${formData.phone}%0A*Country:* ${formData.country}%0A*City:* ${formData.city}%0A*Location:* ${formData.location}%0A%0A_See you at the table!_`;
            setTimeout(() => {
                window.open(`https://wa.me/251910884585?text=${msg}`, '_blank');
                this.reset(); showSection('home');
                btn.disabled = false; btn.style.background = "#FCA311"; btn.innerText = "CONFIRM REGISTRATION";
                document.getElementById('slot-badge').classList.add('hidden');
            }, 1500);
        }
    }).catch(() => { btn.disabled = false; btn.innerText = "RETRY"; });
});
