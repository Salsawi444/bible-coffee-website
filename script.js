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
    // Hide ALL sections
    document.querySelectorAll('.section-container').forEach(s => s.style.display = 'none');
    const homeWrapper = document.getElementById('home-wrapper');
    
    // Toggle Home Wrapper
    if (id === 'home') {
        homeWrapper.style.display = 'block';
    } else {
        homeWrapper.style.display = 'none';
        const target = document.getElementById(id);
        if (target) target.style.display = 'block';
    }
    
    // UI Updates
    document.querySelectorAll('.nav-links button').forEach(b => b.classList.remove('active'));
    if (btn) {
        btn.classList.add('active');
    } else if (id === 'join') {
        // Highlight Join button if clicked from Hero CTA
        document.querySelectorAll('.nav-links button').forEach(b => {
            if(b.textContent.includes('JOIN')) b.classList.add('active');
        });
    }

    // Close Mobile Menu
    document.getElementById('nav-links').classList.remove('active');
    window.scrollTo(0, 0);
}

// Fixed Hamburger Toggle
document.getElementById('menu-toggle').addEventListener('click', function(e) {
    e.stopPropagation();
    document.getElementById('nav-links').classList.toggle('active');
});

// --- FORM LOGIC ---
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
        alert("Error connecting. Try again.");
        btn.disabled = false;
        btn.innerHTML = "CLAIM MY SEAT";
    });
});

lucide.createIcons();
