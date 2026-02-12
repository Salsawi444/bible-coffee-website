const WHATSAPP_NUMBER = "251910884585";
const SHEETDB_URL = 'https://sheetdb.io/api/v1/uax3shq47wuep';

const cityData = {
    "Ethiopia": ["Addis Ababa (Bole)", "Addis Ababa (Old Airport)", "Addis Ababa (Sarbet)"],
    "South Africa": ["Johannesburg", "Cape Town"],
    "Sweden": ["Stockholm", "Gothenburg"],
    "Netherlands": ["Rotterdam", "Amsterdam"],
    "Germany": ["Frankfurt", "Berlin"]
};

// --- NAVIGATION LOGIC ---
function showSection(id, btn) {
    // 1. Hide Home Wrapper and ALL Sections
    document.getElementById('home-wrapper').style.display = 'none';
    document.querySelectorAll('.section-container').forEach(s => s.style.display = 'none');

    // 2. Show the requested section
    if (id === 'home') {
        document.getElementById('home-wrapper').style.display = 'block';
    } else {
        const target = document.getElementById(id);
        if (target) target.style.display = 'block';
    }

    // 3. Update Buttons
    document.querySelectorAll('.nav-links button').forEach(b => b.classList.remove('active'));
    if (btn) btn.classList.add('active');

    // 4. Close Mobile Menu
    document.getElementById('nav-links').classList.remove('active');
    
    // 5. Scroll to Top
    window.scrollTo(0, 0);
}

// Mobile Menu Toggle
document.getElementById('menu-toggle').addEventListener('click', function() {
    document.getElementById('nav-links').classList.toggle('active');
});

// --- DROPDOWN LOGIC (Untouched) ---
function updateCities() {
    const country = document.getElementById('country').value;
    const citySelect = document.getElementById('city');
    citySelect.innerHTML = '<option value="" disabled selected></option>';
    if(cityData[country]) {
        cityData[country].forEach(city => {
            let opt = document.createElement('option');
            opt.value = city;
            opt.innerHTML = city;
            citySelect.appendChild(opt);
        });
    }
}

// --- FORM SUBMISSION (Untouched) ---
document.getElementById('regForm').addEventListener('submit', function(e) {
    e.preventDefault();
    const btn = document.getElementById('submit-btn');
    btn.disabled = true;
    btn.innerHTML = "RESERVING...";

    const formData = new FormData(this);
    const data = Object.fromEntries(formData);

    fetch(SHEETDB_URL, {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({ data: [data] })
    })
    .then(res => {
        const text = `BIBLE & COFFEE RESERVATION\n\nName: ${data.Name}\nCity: ${data.City}\nI'm ready for Friday!`;
        window.location.href = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(text)}`;
    })
    .catch(err => {
        alert("Connection error. Please try again.");
        btn.disabled = false;
        btn.innerHTML = "CLAIM MY SEAT";
    });
});

lucide.createIcons();
