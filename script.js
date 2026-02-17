/* --- 0. THE CODE JOYSTICK (DESKTOP ONLY) --- */
/* Tune these numbers to move your content. Negative = Up/Left, Positive = Down/Right */
const DESKTOP_POS = {
    titleY: 5,      // Move "BIBLE & COFFEE" Up/Down (px)
    contentY: 0,    // Move Subtitle & Paragraph Up/Down (px)
    globalX: -130      // Move Everything Left/Right (px)
};

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

/* --- 2. NAVIGATION & RESET LOGIC --- */
function showSection(id, btn) {
    // FIX: Added 'sermon', 'events', and 'support' to the tracking list so they can be toggled
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
        if (target) { 
            target.style.display = 'block'; 
            target.classList.remove('hidden'); 
        }
    }

    document.querySelectorAll('.nav-links button').forEach(b => b.classList.remove('active'));
    if (btn) btn.classList.add('active');
    const navLinks = document.getElementById('nav-links');
    if (navLinks) navLinks.classList.remove('active-menu');
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

function resetToHome() {
    window.scrollTo(0, 0);
    setTimeout(() => {
        location.reload();
    }, 100);
}

/* --- 3. VIDEO ENGINE --- */
function openVideo(id) {
    window.open(`https://www.youtube.com/watch?v=${id}`, '_blank');
}

/* --- 4. FORM & SEAT COUNTER LOGIC --- */
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

async function checkSlots() {
    const location = document.getElementById('location').value;
    const statusText = document.getElementById('slot-status-text');

    if (!location) return;
    statusText.innerHTML = `<span style="opacity: 0.5;">SCANNING TABLE CAPACITY...</span>`;

    try {
        const response = await fetch(API_URL);
        const data = await response.json();
        const booked = data.filter(entry => entry.Location === location).length;
        const available = 10 - booked;

        if (available <= 0) {
            statusText.innerHTML = `<span class="counter-full">[ TABLE FULL ]</span> <a href="mailto:info@bibleandcoffee.com?subject=Waitlist:%20${location}" style="color: #FCA311; text-decoration: underline; font-size: 10px;">CONTACT FOR OVERRIDE</a>`;
        } else {
            statusText.innerHTML = `<span class="counter-glow">[ ${available} / 10 SEATS REMAINING ]</span>`;
        }
    } catch (error) {
        statusText.innerText = "CONNECTION ACTIVE. PROCEED.";
    }
}

function showSuccess() {
    const wrapper = document.querySelector('.premium-form-wrapper');
    
    // Smooth transition out
    wrapper.style.transition = 'all 0.8s cubic-bezier(0.4, 0, 0.2, 1)';
    wrapper.style.opacity = '0';
    wrapper.style.transform = 'scale(0.98)';
    
    setTimeout(() => {
        wrapper.innerHTML = `
            <div style="padding: 80px 20px; text-align: center; animation: premiumFadeIn 1.2s ease-out forwards;">
                <div style="width: 1px; height: 60px; background: linear-gradient(to bottom, transparent, #FCA311, transparent); margin: 0 auto 40px; box-shadow: 0 0 15px rgba(252, 163, 17, 0.3);"></div>

                <h2 style="font-family: 'Inter'; font-weight: 200; font-size: 22px; letter-spacing: 12px; color: #fff; margin-bottom: 20px; text-transform: uppercase;">
                    RESERVED
                </h2>
                
                <p style="font-family: 'Inter'; font-size: 10px; color: rgba(255,255,255,0.5); letter-spacing: 5px; text-transform: uppercase; line-height: 2.5; margin-bottom: 40px;">
                    YOUR SEAT HAS BEEN RESERVED.<br>
                    <span style="color: #FCA311; opacity: 0.9;">WE WILL TEXT YOU SOON.</span>
                </p>

                <a href="javascript:void(0)" 
   onclick="window.scrollTo(0, 0); setTimeout(() => { window.location.href = window.location.pathname; }, 100);" 
   style="font-family: 'Inter'; font-size: 9px; letter-spacing: 4px; color: #fff; text-decoration: none; border-bottom: 1px solid rgba(255,255,255,0.2); padding-bottom: 5px; transition: 0.3s;"
   onmouseover="this.style.borderColor='#FCA311'; this.style.color='#FCA311'" 
   onmouseout="this.style.borderColor='rgba(255,255,255,0.2)'; this.style.color='#fff'">
    BACK TO HOME
</a>
            </div>
        `;
        wrapper.style.opacity = '1';
        wrapper.style.transform = 'scale(1)';
    }, 600);
}

/* --- 5. INITIALIZATION & SUBMISSION --- */
document.addEventListener('DOMContentLoaded', () => {
    // A. MENU LOGIC
    const menuBtn = document.getElementById('menu-toggle');
    const navLinks = document.getElementById('nav-links');
    if (menuBtn && navLinks) {
        menuBtn.addEventListener('click', () => { navLinks.classList.toggle('active-menu'); });
    }
    if (window.lucide) { lucide.createIcons(); }

    // B. THE CODE JOYSTICK ENGINE (DESKTOP ONLY)
    if (window.innerWidth >= 1024) {
        const title = document.querySelector('.brand-block h1');
        const content = document.querySelector('.brand-block > div');
        const wrapper = document.querySelector('.brand-block');

        if (title) title.style.transform = `translateY(${DESKTOP_POS.titleY}px)`;
        if (content) content.style.transform = `translateY(${DESKTOP_POS.contentY}px)`;
        if (wrapper) wrapper.style.transform = `translateX(${DESKTOP_POS.globalX}px)`;
    }

    // C. FORM SUBMISSION
    const form = document.getElementById('regForm');
    if (form) {
        form.addEventListener("submit", async (e) => {
            e.preventDefault();
            const btnText = document.getElementById('btn-text');
            btnText.innerHTML = "LOCKING RESERVATION...";

            const now = new Date();
            
            const payload = {
                "Name": form.elements["Name"].value,
                "Phone": form.elements["Phone"].value,
                "Email": form.elements["Email"].value,
                "Country": form.elements["Country"].value,
                "City": form.elements["City"].value,
                "Location": form.elements["Location"].value,
                "Registration Date": now.toLocaleDateString(),
                "Registration Time": now.toLocaleTimeString()
            };

            try {
                const response = await fetch(API_URL, {
                    method: "POST",
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ data: [payload] })
                });

                if (response.ok) {
                    showSuccess();
                    form.reset();
                } else {
                    throw new Error('Network response was not ok');
                }
            } catch (err) {
                alert("Protocol Interrupted. Please check your connection.");
                btnText.innerHTML = "RESERVE YOUR SEAT";
            }
        });
    }
});
