/* --- 1. GLOBAL DATABASE (WORLD TOUR EDITION) --- */
const db = {
    "Ethiopia": { 
        "Addis Ababa": ["Bole Atlas (The Cup)", "Mexico", "Piassa", "Megenagna", "CMC", "Old Airport"], 
        "Hawassa": ["Lake Side Coffee"], "Adama": ["City Center"], "Bahir Dar": ["Lake Front"]
    },
    "Kenya": { 
        "Nairobi": ["Kilimani District", "Westlands", "Karen", "Gigiri"],
        "Mombasa": ["Nyali", "Bamburi"], "Kisumu": ["Milimani"]
    },
    "Nigeria": {
        "Lagos": ["Victoria Island", "Ikeja", "Lekki Phase 1"],
        "Abuja": ["Maitama", "Wuse 2"], "Port Harcourt": ["GRA"]
    },
    "South Africa": { 
        "Johannesburg": ["Sandton", "Rosebank", "Maboneng"], 
        "Cape Town": ["City Bowl", "Sea Point", "Stellenbosch"], "Durban": ["Umhlanga"]
    },
    "USA": { 
        "Dallas": ["Downtown", "Plano", "Frisco"], "Houston": ["Galleria Area", "Sugar Land"],
        "New York": ["Brooklyn", "Manhattan", "Queens"], "Los Angeles": ["Santa Monica", "Pasadena", "Silver Lake"],
        "Washington DC": ["Georgetown"], "Atlanta": ["Buckhead"], "Chicago": ["Lincoln Park"],
        "Miami": ["Brickell"], "Seattle": ["Capitol Hill"]
    },
    "UK": { 
        "London": ["Central London", "Canary Wharf", "Shoreditch", "Soho"],
        "Manchester": ["Northern Quarter"], "Birmingham": ["City Centre"], "Edinburgh": ["Old Town"]
    },
    "UAE": {
        "Dubai": ["Downtown Dubai", "Marina", "Jumeirah"], "Abu Dhabi": ["Corniche", "Yas Island"]
    },
    "Canada": { 
        "Toronto": ["Downtown", "Scarborough", "Liberty Village"], "Vancouver": ["Gastown", "Kitsilano"], "Montreal": ["Plateau"]
    },
    "Australia": { 
        "Sydney": ["CBD", "Surry Hills", "Bondi"], "Melbourne": ["Southbank", "Fitzroy"], "Brisbane": ["Fortitude Valley"]
    },
    "Germany": { "Berlin": ["Mitte", "Kreuzberg"], "Frankfurt": ["Innenstadt"], "Munich": ["Altstadt"], "Hamburg": ["Altona"] },
    "France": { "Paris": ["Le Marais", "Montmartre"], "Lyon": ["Presqu'île"] },
    "Italy": { "Rome": ["Trastevere"], "Milan": ["Brera"] },
    "Brazil": { "Rio de Janeiro": ["Ipanema"], "São Paulo": ["Jardins"] },
    "Japan": { "Tokyo": ["Shibuya", "Shinjuku"], "Osaka": ["Umeda"] },
    "South Korea": { "Seoul": ["Gangnam", "Itaewon"] },
    "China": { "Hong Kong": ["Central"], "Shanghai": ["Pudong"] },
    "Ghana": { "Accra": ["East Legon", "Osu"], "Kumasi": ["Adum"] },
    "Uganda": { "Kampala": ["Central District", "Kololo", "Entebbe"] },
    "Rwanda": { "Kigali": ["Nyarugenge", "Kimihurura", "Gacuriro"] },
    "Egypt": { "Cairo": ["Zamalek", "Maadi"], "Alexandria": ["Corniche"] },
    "Israel": { "Tel Aviv": ["Rothschild Blvd"], "Jerusalem": ["City Center"] }
};

/* --- 2. NAVIGATION LOGIC --- */
function showSection(id, btn) {
    const sections = ['home-wrapper', 'magazine', 'merch', 'sermon', 'events', 'support', 'join'];
    sections.forEach(sectionId => {
        const el = document.getElementById(sectionId);
        if (el) {
            el.style.display = 'none';
            el.classList.add('hidden');
        }
    });

    if (id === 'home') {
        const home = document.getElementById('home-wrapper');
        if (home) { home.style.display = 'block'; home.classList.remove('hidden'); }
    } else {
        const target = document.getElementById(id);
        if (target) { target.style.display = 'block'; target.classList.remove('hidden'); }
    }

    document.querySelectorAll('.nav-links button').forEach(b => b.classList.remove('active'));
    if (btn) btn.classList.add('active');
    const navLinks = document.getElementById('nav-links');
    if (navLinks) navLinks.classList.remove('active-menu');
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

/* --- 3. FORM & SEAT COUNTER LOGIC --- */
const API_URL = "https://sheetdb.io/api/v1/9q45d3e7oe5ks"; 

function updateCities() {
    const country = document.getElementById('country').value;
    const citySelect = document.getElementById('city');
    const locSelect = document.getElementById('location');
    
    citySelect.innerHTML = '<option value="" disabled selected></option>'; 
    locSelect.innerHTML = '<option value="" disabled selected></option>';
    
    if (db[country]) {
        Object.keys(db[country]).forEach(city => {
            let opt = document.createElement('option');
            opt.value = city; opt.textContent = city;
            citySelect.appendChild(opt);
        });
    }
}

function updateLocations() {
    const country = document.getElementById('country').value;
    const city = document.getElementById('city').value;
    const locSelect = document.getElementById('location');
    
    locSelect.innerHTML = '<option value="" disabled selected></option>';
    
    if (db[country] && db[country][city]) {
        db[country][city].forEach(loc => {
            let opt = document.createElement('option');
            opt.value = loc; opt.textContent = loc;
            locSelect.appendChild(opt);
        });
    }
}

// LIVE SEAT CHECKER
async function checkSlots() {
    const location = document.getElementById('location').value;
    const statusText = document.getElementById('slot-status-text');

    if (!location) return;
    statusText.innerText = "VERIFYING CAPACITY...";

    try {
        const response = await fetch(API_URL);
        const data = await response.json();
        // Filters the "Location" column in your Google Sheet
        const booked = data.filter(entry => entry.Location === location).length;
        const available = 8 - booked;

        if (available <= 0) {
            statusText.innerHTML = `<span style="color: #ff4444;">[ TABLE FULL ]</span> JOIN WAITLIST BELOW`;
        } else {
            statusText.innerHTML = `<span style="color: #FCA311;">[ ${available} SEATS REMAINING ]</span> AT THIS TABLE`;
        }
    } catch (error) {
        statusText.innerText = "CONNECTION ACTIVE. PROCEED WITH RESERVATION.";
    }
}

function showSuccess() {
    const wrapper = document.querySelector('.premium-form-wrapper');
    wrapper.innerHTML = `
        <div style="text-align: center; padding: 60px 20px; animation: fadeIn 0.8s ease;">
            <div style="width: 80px; height: 80px; border: 2px solid #FCA311; border-radius: 50%; margin: 0 auto 30px; display: flex; align-items: center; justify-content: center;">
                <i data-lucide="check" style="color: #FCA311; width: 40px; height: 40px;"></i>
            </div>
            <h2 class="premium-glitch-title" style="font-size: 2rem; letter-spacing: 5px;">ACCESS GRANTED</h2>
            <div class="premium-divider"></div>
            <p class="premium-subtitle" style="font-size: 14px; color: white; opacity: 0.8;">YOUR TABLE IS BEING PREPARED.</p>
            <p style="font-family: 'Inter'; font-size: 11px; color: #FCA311; margin-top: 20px; letter-spacing: 2px;">CHECK YOUR EMAIL FOR CONFIRMATION</p>
            <button onclick="location.reload()" class="max-capacity-btn" style="margin-top: 40px; width: auto; padding: 15px 40px; font-size: 12px;">RETURN TO HOME</button>
        </div>
    `;
    if (window.lucide) { lucide.createIcons(); }
}

/* --- 4. INITIALIZATION & SUBMISSION --- */
document.addEventListener('DOMContentLoaded', () => {
    const menuBtn = document.getElementById('menu-toggle');
    const navLinks = document.getElementById('nav-links');
    if (menuBtn && navLinks) {
        menuBtn.addEventListener('click', () => { navLinks.classList.toggle('active-menu'); });
    }
    if (window.lucide) { lucide.createIcons(); }

    const form = document.getElementById('regForm');
    if (form) {
        form.addEventListener("submit", e => {
            e.preventDefault();
            const btnText = document.getElementById('btn-text');
            btnText.innerHTML = "ESTABLISHING CONNECTION...";

            // CAPTURE DATE AND TIME
            const now = new Date();
            const regDate = now.toLocaleDateString();
            const regTime = now.toLocaleTimeString();

            const formData = new FormData(form);
            // These keys must match your Google Sheet column headers exactly
            formData.append("Registration Date", regDate);
            formData.append("Registration Time", regTime);

            fetch(API_URL, {
                method: "POST",
                body: formData,
            }).then(res => res.json())
            .then(() => {
                showSuccess();
                form.reset();
            })
            .catch(err => {
                alert("Protocol Interrupted. Please check your connection.");
                btnText.innerHTML = "RESERVE YOUR SEAT";
            });
        });
    }
});
