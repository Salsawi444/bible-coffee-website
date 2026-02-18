/* --- 0. THE CODE JOYSTICK (DESKTOP ONLY) --- */
const DESKTOP_POS = {
    titleY: 5,      
    contentY: 0,    
    globalX: -130      
};

/* --- 1. GLOBAL DATABASE (WORLD TOUR EDITION) --- */
/* --- THE MIGHTY GLOBAL DATA VAULT --- */
const globalData = {
    "Ethiopia": {
        cities: ["Addis Ababa", "Nazreth", "Hawassa", "Bahir Dar", "Dire Dawa", "Gondar", "Jimma", "Mekelle", "Dessie"],
        locations: { "Addis Ababa": ["Bole Atlas (The Cup)", "Kazanchis", "Old Airport", "Sarbet", "CMC", "Piyassa"] }
    },
    "Kenya": {
        cities: ["Nairobi", "Mombasa", "Kisumu", "Nakuru", "Eldoret"],
        locations: { "Nairobi": ["Westlands Hub", "Karen Table", "Kilimani Coffee Shop", "CBD Central"] }
    },
    "South Africa": {
        cities: ["Johannesburg", "Cape Town", "Pretoria", "Durban", "Port Elizabeth"],
        locations: { "Johannesburg": ["Sandton Table", "Soweto Hub", "Braamfontein Vault"] }
    },
    "Nigeria": {
        cities: ["Lagos", "Abuja", "Port Harcourt", "Ibadan"],
        locations: { "Lagos": ["Lekki Phase 1", "Ikeja Hub", "Victoria Island"] }
    },
    "USA": {
        cities: ["New York", "Dallas", "Washington DC", "Los Angeles", "Atlanta", "Chicago", "Houston", "Seattle", "Minneapolis"],
        locations: { "Dallas": ["Frisco Hub", "Downtown Dallas", "Plano Table"], "New York": ["Manhattan Vault", "Brooklyn Table"] }
    },
    "United Kingdom": {
        cities: ["London", "Manchester", "Birmingham", "Leeds", "Glasgow", "Liverpool"],
        locations: { "London": ["Shoreditch Terminal", "Southwark Coffee", "Camden Hub", "Greenwich"] }
    },
    "UAE": {
        cities: ["Dubai", "Abu Dhabi", "Sharjah"],
        locations: { "Dubai": ["Downtown Dubai Hub", "Marina Table", "Business Bay"] }
    },
    "Canada": {
        cities: ["Toronto", "Vancouver", "Ottawa", "Montreal", "Calgary"],
        locations: { "Toronto": ["Downtown Core", "North York Table"] }
    },
    "Sweden": {
        cities: ["Stockholm", "Gothenburg", "Malmö", "Uppsala"],
        locations: { "Stockholm": ["City Center Vault", "Södermalm Coffee"] }
    },
    "Germany": {
        cities: ["Berlin", "Frankfurt", "Munich", "Hamburg"],
        locations: { "Berlin": ["Mitte Hub", "Kreuzberg Table"] }
    }
};

/* --- 2. NAVIGATION & RESET LOGIC --- */
function showSection(id, btn) {
    const sections = ['home-wrapper', 'magazine', 'merch', 'sermon', 'events', 'support', 'join', 'contact'];
    sections.forEach(sectionId => {
        const el = document.getElementById(sectionId);
        if (el) { el.style.display = 'none'; el.classList.add('hidden'); }
    });
    const target = (id === 'home') ? document.getElementById('home-wrapper') : document.getElementById(id);
    if (target) { target.style.display = 'block'; target.classList.remove('hidden'); }
    document.querySelectorAll('.nav-links button').forEach(b => b.classList.remove('active'));
    if (btn) btn.classList.add('active');
    const navLinks = document.getElementById('nav-links');
    if (navLinks) navLinks.classList.remove('active-menu');
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

function resetToHome() {
    window.scrollTo(0, 0);
    setTimeout(() => { location.reload(); }, 100);
}

/* --- 3. VIDEO ENGINE --- */
function openVideo(id) {
    const overlay = document.createElement('div');
    overlay.style = `
        position: fixed; top: 0; left: 0; width: 100%; height: 100%;
        background: rgba(0,0,0,0.9); display: flex; align-items: center;
        justify-content: center; z-index: 10000; cursor: pointer;
    `;
    
    overlay.innerHTML = `
        <div style="width: 90%; max-width: 900px; aspect-ratio: 16/9;">
            <iframe width="100%" height="100%" 
                src="https://www.youtube.com/embed/${id}?autoplay=1" 
                frameborder="0" allow="autoplay; encrypted-media" allowfullscreen>
            </iframe>
            <p style="color: white; text-align: center; margin-top: 15px; font-family: sans-serif;">Click anywhere to close</p>
        </div>
    `;

    overlay.onclick = () => overlay.remove();
    document.body.appendChild(overlay);
}

/* --- 4. FORM & SEAT COUNTER LOGIC --- */
const API_URL = "https://sheetdb.io/api/v1/9q45d3e7oe5ks"; 

function updateCities() {
    const countrySel = document.getElementById('country');
    const citySel = document.getElementById('city');
    const selectedCountry = countrySel.value;
    
    citySel.innerHTML = '<option value="" disabled selected>SELECT CITY</option>';
    const locField = document.getElementById('location');
    if(locField) locField.innerHTML = '<option value="" disabled selected>SELECT LOCATION</option>';
    
    const countryKey = Object.keys(globalData).find(
        key => key.toLowerCase() === selectedCountry.toLowerCase()
    );

    if (countryKey && globalData[countryKey]) {
        globalData[countryKey].cities.forEach(city => {
            let opt = document.createElement('option');
            opt.value = city;
            opt.innerHTML = city.toUpperCase();
            citySel.appendChild(opt);
        });
    }
}

/* --- THE FIX: updateLocations --- */
function updateLocations() {
    const country = document.getElementById('country').value;
    const city = document.getElementById('city').value;
    const locSelect = document.getElementById('location');
    
    locSelect.innerHTML = '<option value="" disabled selected>SELECT LOCATION</option>';
    
    // Fixed: Now correctly points to globalData
    if (globalData[country] && globalData[country].locations[city]) {
        globalData[country].locations[city].forEach(loc => {
            let opt = document.createElement('option');
            opt.value = loc; 
            opt.textContent = loc.toUpperCase();
            locSelect.appendChild(opt);
        });
    }
}

async function checkSlots() {
    const location = document.getElementById('location').value;
    const statusText = document.getElementById('slot-status-text');
    const submitBtn = document.querySelector('#regForm button[type="submit"]');
    const btnText = document.getElementById('btn-text');
    if (!location) return;
    statusText.innerHTML = `<span style="opacity: 0.5;">SCANNING TABLE CAPACITY...</span>`;
    try {
        const response = await fetch(API_URL);
        const data = await response.json();
        const booked = data.filter(entry => entry.Location === location).length;
        const available = 10 - booked;
        if (available <= 0) {
            statusText.innerHTML = `<span class="counter-full">[ TABLE AT MAXIMUM CAPACITY ]</span>`;
            btnText.innerText = "TABLE FULL - CONTACT FOR WAITLIST";
            submitBtn.onclick = (e) => { e.preventDefault(); showSection('contact'); };
            submitBtn.style.background = "#333";
            submitBtn.style.color = "#FCA311";
        } else {
            statusText.innerHTML = `<span class="counter-glow">[ ${available} / 10 SEATS REMAINING ]</span>`;
            btnText.innerText = "RESERVE YOUR SEAT";
            submitBtn.onclick = null;
            submitBtn.style.background = "#FCA311";
            submitBtn.style.color = "black";
        }
    } catch (error) {
        statusText.innerText = "CONNECTION ACTIVE. PROCEED.";
    }
}

function showSuccess() {
    const wrapper = document.querySelector('.premium-form-wrapper');
    wrapper.style.transition = 'all 0.8s cubic-bezier(0.4, 0, 0.2, 1)';
    wrapper.innerHTML = `
        <div style="text-align: center; padding: 40px 0;">
            <i data-lucide="check-circle" style="color: #FCA311; width: 80px; height: 80px; margin: 0 auto 20px;"></i>
            <h2 class="premium-glitch-title" style="font-size: 2rem;">SUCCESS</h2>
            <p class="premium-subtitle" style="margin-top: 20px;">YOU HAVE A SEAT AT THE TABLE.</p>
            <button onclick="resetToHome()" class="max-capacity-btn" style="margin-top: 40px; width: auto; padding: 15px 40px;">RETURN HOME</button>
        </div>
    `;
    lucide.createIcons();
}

document.getElementById('regForm')?.addEventListener('submit', async function(e) {
    e.preventDefault();
    const btn = this.querySelector('button');
    const btnText = document.getElementById('btn-text');
    btn.disabled = true;
    btnText.innerText = "PROCESSING...";
    
    const formData = new FormData(this);
    const data = Object.fromEntries(formData.entries());
    data.Date = new Date().toLocaleString();

    try {
        const res = await fetch(API_URL, {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({data: [data]})
        });
        if(res.ok) showSuccess();
    } catch(err) {
        alert("System Error. Try Again.");
        btn.disabled = false;
        btnText.innerText = "RESERVE YOUR SEAT";
    }
});

function generateVideoCode() {
    const url = document.getElementById('sermon-url').value;
    const title = document.getElementById('sermon-title').value;
    const category = document.getElementById('sermon-cat').value;
    const videoId = url.split('v=')[1]?.split('&')[0];
    if(videoId) {
        document.getElementById('admin-output').value = `<div class=\"sermon-card-premium\" onclick=\"openVideo('${videoId}')\">
    <div class=\"sermon-poster\">
        <img src=\"https://img.youtube.com/vi/${videoId}/hqdefault.jpg\" alt=\"${title}\">
        <div class=\"play-overlay\"><i data-lucide=\"play-circle\"></i></div>
    </div>
    <div class=\"sermon-details\">
        <span class=\"category\">${category.toUpperCase()}</span>
        <h3>${title}</h3>
    </div>
</div>`;
    } else { 
        alert("Invalid YouTube Link."); 
    }
}

function generateMerchCode() {
    const name = document.getElementById('merch-name').value;
    const img = document.getElementById('merch-img').value;
    if(!name || !img) { alert("Fill all Merch fields."); return; }
    document.getElementById('admin-output').value = `<div class=\"merch-item\" style=\"background: #0a0a0a; border: 1px solid rgba(255,255,255,0.05); padding: 15px;\">
    <div class=\"merch-img-wrapper\" style=\"aspect-ratio: 1/1; overflow: hidden; background: #111;\">
        <img src=\"${img}\" style=\"width: 100%; height: 100%; object-fit: cover; filter: grayscale(100%); transition: 0.5s;\" onmouseover=\"this.style.filter='grayscale(0%)'\" onmouseout=\"this.style.filter='grayscale(100%)'\">
    </div>
    <div class=\"merch-meta\" style=\"margin-top: 15px;\">
        <span style=\"font-family: 'Oswald'; color: #FCA311; font-size: 10px; letter-spacing: 3px;\">NEW DROP</span>
        <h3 style=\"font-family: 'Oswald'; color: white; margin-top: 5px; font-size: 14px; letter-spacing: 2px;\">${name.toUpperCase()}</h3>
    </div>
</div>`;
}

document.addEventListener('DOMContentLoaded', () => {
    lucide.createIcons();
    const menuToggle = document.getElementById('menu-toggle');
    const navLinks = document.getElementById('nav-links');
    if (menuToggle && navLinks) {
        menuToggle.onclick = () => navLinks.classList.toggle('active-menu');
    }
});
