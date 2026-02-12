const WHATSAPP_NUMBER = "251910884585";
const SHEETDB_URL = 'https://sheetdb.io/api/v1/uax3shq47wuep';

const cityData = {
    "Ethiopia": ["Addis Ababa (Bole)", "Addis Ababa (Old Airport)", "Addis Ababa (Sarbet)"],
    "South Africa": ["Johannesburg", "Cape Town"],
    "Sweden": ["Stockholm", "Gothenburg"],
    "Netherlands": ["Rotterdam", "Amsterdam"],
    "Germany": ["Frankfurt", "Berlin"]
};

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

function showSection(id, btn) {
    document.querySelectorAll('.section-container').forEach(s => s.style.display = 'none');
    document.getElementById('home-wrapper').style.display = (id === 'home') ? 'block' : 'none';
    if(id !== 'home') document.getElementById(id).style.display = 'block';
    
    document.querySelectorAll('.nav-links button').forEach(b => b.classList.remove('active'));
    if(btn) btn.classList.add('active');
    window.scrollTo(0,0);
}

// FORM SUBMISSION (Untouched Logic)
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
