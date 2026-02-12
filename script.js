// NAVIGATION LOGIC
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

// DYNAMIC DATA MAP (Addis Ababa Focused)
const db = {
    "Ethiopia": { 
        "Addis Ababa": ["Bole", "Mexico", "Megenagna", "Haile Garment", "Piassa", "Old Airport", "CMC", "Sar Bet"], 
        "Adama": ["Main St", "Station Area"],
        "Bahir Dar": ["Lake Front"]
    },
    "USA": { 
        "Dallas": ["Uptown", "Downtown"], 
        "New York": ["Brooklyn", "Manhattan"] 
    }
};

/**
 * CAPACITY SETTINGS
 * Every location starts with 8 spots. 
 * Change the number here to manually simulate a full location for testing.
 */
const capacityMap = {
    "Bole": 8,
    "Mexico": 8,
    "Megenagna": 8,
    "Haile Garment": 8,
    "Piassa": 8,
    "Old Airport": 8,
    "CMC": 8,
    "Sar Bet": 8
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
    if (db[country] && db[country][city]) db[country][city].forEach(l => locSelect.add(new Option(l, l)));
}

function checkSlots() {
    const loc = document.getElementById('location').value;
    const badge = document.getElementById('slot-badge');
    const count = document.getElementById('slot-count');
    const btn = document.getElementById('submit-btn');
    const err = document.getElementById('error-message');
    
    // Default to 8 if not specifically defined in capacityMap
    const available = capacityMap[loc] !== undefined ? capacityMap[loc] : 8;
    
    badge.classList.remove('hidden');
    count.innerText = available;

    if (available <= 0) {
        btn.disabled = true; 
        btn.innerText = "FULLY BOOKED";
        btn.style.opacity = "0.5";
        err.innerHTML = "THIS LOCATION IS FULL.<br>PLEASE SELECT ANOTHER AREA OR CONTACT US FOR ASSISTANCE."; 
        err.classList.remove('hidden');
    } else {
        btn.disabled = false; 
        btn.style.opacity = "1";
        btn.innerText = "CONFIRM REGISTRATION"; 
        err.classList.add('hidden');
    }
}

// BACKGROUND TIMESTAMP & ICON INIT
document.addEventListener("DOMContentLoaded", () => {
    lucide.createIcons();
    const today = new Date();
    document.getElementById("regDate").value = today.toISOString().split("T")[0];
    document.getElementById("regTime").value = today.toTimeString().slice(0,5);
});

// SHEETDB LIVE SUBMISSION
const form = document.getElementById('regForm');
form.addEventListener('submit', e => {
    e.preventDefault();
    
    const btn = document.getElementById('submit-btn');
    const err = document.getElementById('error-message');
    
    const inputs = form.querySelectorAll('[required]');
    let isOk = true;
    inputs.forEach(i => {
        if (!i.value) {
            isOk = false;
            i.style.borderBottom = "1px solid #ef4444";
        }
    });

    if (!isOk) {
        err.innerText = "PLEASE FILL ALL REQUIRED FIELDS";
        err.classList.remove('hidden');
        return;
    }

    btn.disabled = true;
    btn.innerText = "PROCESSING...";

    fetch('https://sheetdb.io/api/v1/9q45d3e7oe5ks', {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            data: [
                {
                    'Name': document.getElementById('name').value,
                    'Email': document.getElementById('email').value,
                    'Phone': document.getElementById('phone').value,
                    'Country': document.getElementById('country').value,
                    'City': document.getElementById('city').value,
                    'Location': document.getElementById('location').value,
                    'Date': document.getElementById('regDate').value,
                    'Time': document.getElementById('regTime').value
                }
            ]
        })
    })
    .then(response => {
        if(response.ok) {
            btn.innerText = "SUCCESSFUL!";
            btn.style.background = "#22c55e"; 
            form.reset();
            setTimeout(() => {
                alert("Registration Confirmed! We'll see you at the table.");
                showSection('home');
                btn.disabled = false;
                btn.style.background = "#FCA311";
                btn.innerText = "CONFIRM REGISTRATION";
                document.getElementById('slot-badge').classList.add('hidden');
            }, 2000);
        } else {
            throw new Error('Network response was not ok.');
        }
    })
    .catch(error => {
        btn.disabled = false;
        btn.innerText = "TRY AGAIN";
        err.innerText = "SYSTEM BUSY. PLEASE TRY AGAIN IN A MOMENT.";
        err.classList.remove('hidden');
    });
});
