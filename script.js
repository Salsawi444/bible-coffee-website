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

// DYNAMIC DATA MAP
const db = {
    "Ethiopia": { 
        "Addis Ababa": ["Bole", "Piazza", "Mexico", "Sar Bet"], 
        "Adama": ["Main St", "Station Area"],
        "Bahir Dar": ["Lake Front"]
    },
    "USA": { 
        "Dallas": ["Uptown", "Downtown"], 
        "New York": ["Brooklyn", "Manhattan"] 
    }
};

// SLOT TRACKING (Adjust these numbers as needed)
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
        btn.disabled = true; 
        btn.innerText = "FULLY BOOKED";
        err.innerHTML = "LOCATION FULL. SELECT ANOTHER AREA."; 
        err.classList.remove('hidden');
    } else {
        btn.disabled = false; 
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
    
    // Final Validation Check
    const inputs = form.querySelectorAll('[required]');
    let isOk = true;
    inputs.forEach(i => {
        if (!i.value) {
            isOk = false;
            i.style.borderBottom = "1px solid #ef4444";
        }
    });

    if (!isOk) {
        err.innerText = "PLEASE FILL ALL FIELDS";
        err.classList.remove('hidden');
        return;
    }

    // Processing State
    btn.disabled = true;
    btn.innerText = "PROCESSING...";

    // Send to SheetDB
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
    .then(response => response.json())
    .then(data => {
        btn.innerText = "SUCCESSFUL!";
        btn.style.background = "#22c55e"; // Green for success
        form.reset();
        setTimeout(() => {
            alert("Registration Confirmed! We'll see you at the table.");
            showSection('home');
            // Reset button
            btn.disabled = false;
            btn.style.background = "#FCA311";
            btn.innerText = "CONFIRM REGISTRATION";
        }, 1500);
    })
    .catch(error => {
        btn.disabled = false;
        btn.innerText = "TRY AGAIN";
        err.innerText = "CONNECTION ERROR. PLEASE TRY AGAIN.";
        err.classList.remove('hidden');
        console.error('Error:', error);
    });
});
