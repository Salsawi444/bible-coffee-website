// NAVIGATION
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

// FORM DATA
const db = {
    "Ethiopia": { "Addis Ababa": ["Bole", "Piazza", "Mexico"], "Adama": ["Main St"] },
    "USA": { "Dallas": ["Uptown", "Downtown"], "New York": ["Brooklyn"] }
};
const slots = { "Bole": 5, "Piazza": 0, "Uptown": 2 };

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

function checkSlots() {
    const loc = document.getElementById('location').value;
    const badge = document.getElementById('slot-badge');
    const count = document.getElementById('slot-count');
    const btn = document.getElementById('submit-btn');
    const err = document.getElementById('error-message');
    const available = slots[loc] !== undefined ? slots[loc] : 10;
    
    badge.classList.remove('hidden');
    count.innerText = available;
    if (available <= 0) {
        btn.disabled = true; btn.innerText = "FULLY BOOKED";
        err.innerHTML = "LOCATION FULL. SELECT ANOTHER AREA."; err.classList.remove('hidden');
    } else {
        btn.disabled = false; btn.innerText = "CONFIRM REGISTRATION"; err.classList.add('hidden');
    }
}

// BACKGROUND TIMESTAMP & INIT
document.addEventListener("DOMContentLoaded", () => {
    lucide.createIcons();
    const today = new Date();
    document.getElementById("regDate").value = today.toISOString().split("T")[0];
    document.getElementById("regTime").value = today.toTimeString().slice(0,5);
});

// VALIDATION
document.getElementById('regForm').addEventListener('submit', function(e) {
    const inputs = this.querySelectorAll('[required]');
    let ok = true;
    inputs.forEach(i => { if (!i.value) { ok = false; i.style.borderBottom = "1px solid red"; } });
    if (!ok) {
        e.preventDefault();
        const err = document.getElementById('error-message');
        err.innerText = "PLEASE FILL ALL FIELDS"; err.classList.remove('hidden');
    }
});
