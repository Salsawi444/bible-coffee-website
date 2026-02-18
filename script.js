/* --- 0. THE CODE JOYSTICK (DESKTOP ONLY) --- */
const DESKTOP_POS = {
    titleY: 5,      
    contentY: 0,    
    globalX: -130      
};

/* --- 1. GLOBAL DATABASE (WORLD TOUR EDITION) --- */
/* --- THE MIGHTY GLOBAL DATA VAULT --- */
/* --- THE MIGHTY GLOBAL DATA VAULT --- */
/* --- THE MIGHTY GLOBAL DATA VAULT --- */
const globalData = {
    "Ethiopia": {
        cities: ["Addis Ababa", "Adama", "Hawassa", "Bahir Dar", "Gondar", "Jimma"],
        locations: {
            "Addis Ababa": ["BOLE", "OLD AIRPORT", "CMC", "PIAZZA", "MEXICO", "SARIS"],
            "Adama": ["POSTA BET", "FRANSAY", "MEBRAT HAYL"],
            "Hawassa": ["LAKE SIDE", "PIAZZA HUB", "TABOR"],
            "Bahir Dar": ["TANA HUB", "DIASPORA ROAD"],
            "Gondar": ["AZEZO", "PIAZZA"],
            "Jimma": ["KOCHE", "HERMATO"]
        }
    },
    "Kenya": {
        cities: ["Nairobi", "Mombasa"],
        locations: {
            "Nairobi": ["WESTLANDS", "KAREN", "KILIMANI"],
            "Mombasa": ["NYALI", "OLD TOWN"]
        }
    },
    "Uganda": {
        cities: ["Kampala", "Entebbe"],
        locations: {
            "Kampala": ["KOLOLO", "NAKASERO"],
            "Entebbe": ["VICTORIA BAY"]
        }
    },
    "Rwanda": {
        cities: ["Kigali"],
        locations: {
            "Kigali": ["KIMIHRURA", "NYARUTARAMA"]
        }
    },
    "Sweden": {
        cities: ["Stockholm", "Gothenburg"],
        locations: {
            "Stockholm": ["ÖSTERMALM", "SÖDERMALM"],
            "Gothenburg": ["LINNÉSTADEN"]
        }
    },
    "Norway": {
        cities: ["Oslo", "Bergen"],
        locations: {
            "Oslo": ["AKER BRYGGE", "FROGNER"],
            "Bergen": ["BRYGGEN"]
        }
    },
    "Finland": {
        cities: ["Helsinki"],
        locations: {
            "Helsinki": ["KAMPPI", "KALLIO"]
        }
    },
    "Italy": {
        cities: ["Rome", "Milan"],
        locations: {
            "Rome": ["TRASTEVERE", "PRATI"],
            "Milan": ["BRERA", "NAVIGLI"]
        }
    },
    "Netherlands": {
        cities: ["Amsterdam", "Rotterdam"],
        locations: {
            "Amsterdam": ["ZUID", "JORDAAN"],
            "Rotterdam": ["CENTRAAL"]
        }
    },
    "USA": {
        cities: ["Dallas", "Houston", "New York"],
        locations: {
            "Dallas": ["DEEP ELLUM", "FRISCO"],
            "Houston": ["DOWNTOWN", "THE HEIGHTS"],
            "New York": ["MANHATTAN", "BROOKLYN"]
        }
    },
    "UAE": {
        cities: ["Dubai", "Abu Dhabi"],
        locations: {
            "Dubai": ["MARINA", "DOWNTOWN"],
            "Abu Dhabi": ["CORNICHE"]
        }
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
    
    // The Video Box
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
    
    // Reset City and Location dropdowns
    citySel.innerHTML = '<option value="" disabled selected>SELECT CITY</option>';
    const locField = document.getElementById('location');
    if(locField) locField.innerHTML = '<option value="" disabled selected>SELECT LOCATION</option>';
    
    // THE FIX: Find the key in globalData regardless of BIG or small letters
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
    } else {
        console.log("Country not found in database:", selectedCountry);
    }
}

function updateLocations() {
    const countrySel = document.getElementById('country');
    const citySel = document.getElementById('city');
    const locSelect = document.getElementById('location');
    
    const country = countrySel.value;
    const city = citySel.value;
    
    // Clear the dropdown
    locSelect.innerHTML = '<option value="" disabled selected>SELECT LOCATION</option>';
    
    // SURGERY FIX: This path matches your globalData vault structure exactly
    if (globalData[country] && globalData[country].locations && globalData[country].locations[city]) {
        globalData[country].locations[city].forEach(loc => {
            let opt = document.createElement('option');
            opt.value = loc;
            opt.textContent = loc.toUpperCase();
            locSelect.appendChild(opt);
        });
    } else {
        console.log("No locations found for:", country, city);
    }
    
    // Run the slot check to update the button
    if (typeof checkSlots === "function") {
        checkSlots();
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
    } catch (error) { statusText.innerText = "CONNECTION ACTIVE. PROCEED."; }
}

function showSuccess() {
    const wrapper = document.querySelector('.premium-form-wrapper');
    wrapper.style.transition = 'all 0.8s cubic-bezier(0.4, 0, 0.2, 1)';
    wrapper.style.opacity = '0';
    wrapper.style.transform = 'scale(0.98)';
    setTimeout(() => {
        wrapper.innerHTML = `<div style="padding: 80px 20px; text-align: center; animation: premiumFadeIn 1.2s ease-out forwards;"><div style="width: 1px; height: 60px; background: linear-gradient(to bottom, transparent, #FCA311, transparent); margin: 0 auto 40px; box-shadow: 0 0 15px rgba(252, 163, 17, 0.3);"></div><h2 style="font-family: 'Inter'; font-weight: 200; font-size: 22px; letter-spacing: 12px; color: #fff; margin-bottom: 20px; text-transform: uppercase;">RESERVED</h2><p style="font-family: 'Inter'; font-size: 10px; color: rgba(255,255,255,0.5); letter-spacing: 5px; text-transform: uppercase; line-height: 2.5; margin-bottom: 40px;">YOUR SEAT HAS BEEN RESERVED.<br><span style="color: #FCA311; opacity: 0.9;">WE WILL TEXT YOU SOON.</span></p><a href="javascript:void(0)" onclick="window.scrollTo(0, 0); setTimeout(() => { window.location.href = window.location.pathname; }, 100);" style="font-family: 'Inter'; font-size: 9px; letter-spacing: 4px; color: #fff; text-decoration: none; border-bottom: 1px solid rgba(255,255,255,0.2); padding-bottom: 5px; transition: 0.3s;" onmouseover="this.style.borderColor='#FCA311'; this.style.color='#FCA311'" onmouseout="this.style.borderColor='rgba(255,255,255,0.2)'; this.style.color='#fff'">BACK TO HOME</a></div>`;
        wrapper.style.opacity = '1';
        wrapper.style.transform = 'scale(1)';
    }, 600);
}

/* --- 5. INITIALIZATION & SUBMISSION --- */
document.addEventListener('DOMContentLoaded', () => {
    const menuBtn = document.getElementById('menu-toggle');
    const navLinks = document.getElementById('nav-links');
    if (menuBtn && navLinks) { menuBtn.addEventListener('click', () => { navLinks.classList.toggle('active-menu'); }); }
    if (window.lucide) { lucide.createIcons(); }
    if (window.innerWidth >= 1024) {
        const title = document.querySelector('.brand-block h1');
        const content = document.querySelector('.brand-block > div');
        const wrapper = document.querySelector('.brand-block');
        if (title) title.style.transform = `translateY(${DESKTOP_POS.titleY}px)`;
        if (content) content.style.transform = `translateY(${DESKTOP_POS.contentY}px)`;
        if (wrapper) wrapper.style.transform = `translateX(${DESKTOP_POS.globalX}px)`;
    }
    const form = document.getElementById('regForm');
    if (form) {
        form.addEventListener("submit", async (e) => {
            e.preventDefault();
            const btnText = document.getElementById('btn-text');
            btnText.innerHTML = "LOCKING RESERVATION...";
            const now = new Date();
            const payload = { "Name": form.elements["Name"].value, "Phone": form.elements["Phone"].value, "Email": form.elements["Email"].value, "Country": form.elements["Country"].value, "City": form.elements["City"].value, "Location": form.elements["Location"].value, "Registration Date": now.toLocaleDateString(), "Registration Time": now.toLocaleTimeString() };
            try {
                const response = await fetch(API_URL, { method: "POST", headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ data: [payload] }) });
                if (response.ok) { showSuccess(); form.reset(); } else { throw new Error('Network response error'); }
            } catch (err) { alert("Protocol Interrupted."); btnText.innerHTML = "RESERVE YOUR SEAT"; }
        });
    }
});

/* --- 6. PLATINUM ADMIN CORE --- */
function secureAccess() {
    const secretKey = "GOLD77";
    const entry = prompt("ENTER ACCESS PROTOCOL:");
    if (entry === secretKey) {
        const panel = document.getElementById('admin-panel');
        panel.classList.remove('hidden');
        panel.style.display = 'block';
    } else if (entry !== null) { alert("ACCESS DENIED."); }
}

function toggleAdminPanel() {
    const panel = document.getElementById('admin-panel');
    panel.classList.add('hidden');
    panel.style.display = 'none';
}

function copyAdminCode() {
    const output = document.getElementById('admin-output');
    if(!output.value) { alert("Nothing to copy!"); return; }
    output.select();
    document.execCommand('copy');
    alert("CODE SECURED.");
}

/* --- 7. ADMIN GENERATOR TEMPLATES --- */
function generateBatchMagCode() {
    const issues = document.querySelectorAll('.mag-batch-issue');
    const imgs = document.querySelectorAll('.mag-batch-img');
    const pdfs = document.querySelectorAll('.mag-batch-pdf');
    let finalCode = "\n";
    let count = 0;

    issues.forEach((el, i) => {
        const issueVal = el.value.trim();
        const imgVal = imgs[i].value.trim();
        const pdfVal = pdfs[i].value.trim();

        if(issueVal && imgVal && pdfVal) {
            count++;
            finalCode += `
<div class="magazine-card" onclick="window.open('${pdfVal}', '_blank')" style="cursor: pointer;">
    <div class="magazine-image-wrapper">
        <img src="${imgVal}" alt="Issue ${issueVal}">
    </div>
    <div style="padding: 20px; border-top: 1px solid rgba(255,255,255,0.05);">
        <p style="font-family: 'Oswald'; color: #FCA311; font-size: 10px; letter-spacing: 4px; margin: 0;">VOLUME 01 // ISSUE ${issueVal}</p>
        <h3 style="font-family: 'Oswald'; color: white; font-size: 1.1rem; letter-spacing: 2px; margin: 10px 0; text-transform: uppercase;">The Weekly Journal</h3>
        <p style="font-family: 'Inter'; color: rgba(255,255,255,0.4); font-size: 9px; letter-spacing: 1px; text-transform: uppercase;">Click to Read —</p>
    </div>
</div>\n`;
        }
    });

    document.getElementById('admin-output').value = finalCode;
}

function generateVidCode() {
    const rawUrl = document.getElementById('vid-url').value;
    const title = document.getElementById('vid-title').value;
    const category = document.getElementById('vid-category') ? document.getElementById('vid-category').value : "FRIDAY SERMON";
    
    const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/;
    const match = rawUrl.match(regExp);
    
    if (match && match[2].length == 11) {
        const videoId = match[2];
        // This generates the EXACT code that fits perfectly in your Cinema Grid
        document.getElementById('admin-output').value = `
<div class="sermon-card-premium" onclick="openVideo('${videoId}')">
    <div class="sermon-poster">
        <img src="https://img.youtube.com/vi/${videoId}/hqdefault.jpg" alt="${title}">
        <div class="play-overlay"><i data-lucide="play-circle"></i></div>
    </div>
    <div class="sermon-details">
        <span class="category">${category.toUpperCase()}</span>
        <h3>${title}</h3>
    </div>
</div>`;
    } else { 
        alert("Invalid YouTube Link."); 
    }
}
function generateMerchCode() {
    const imgUrl = document.getElementById('merchImg').value;
    const title = document.getElementById('merchTitle').value;
    const outputBox = document.getElementById('generatedCode');

    // THE BRICK (The individual item)
    const itemCode = `
    <div class="merch-item group">
        <div class="merch-img-wrapper" style="aspect-ratio: 1/1; overflow: hidden; background: #111; border: 1px solid rgba(255,255,255,0.05);">
            <img src="${imgUrl}" 
                 style="width: 100%; height: 100%; object-fit: cover; filter: grayscale(100%); transition: 0.7s ease;" 
                 onmouseover="this.style.filter='grayscale(0%)'" 
                 onmouseout="this.style.filter='grayscale(100%)'">
        </div>
        <div class="mt-6">
            <span style="font-family: 'Oswald'; color: #FCA311; font-size: 10px; letter-spacing: 3px; text-transform: uppercase;">COLLECTION 2026</span>
            <h4 style="font-family: 'Oswald'; color: white; font-size: 24px; text-transform: uppercase; margin-top: 5px;">${title}</h4>
            <p style="font-family: 'Inter'; color: rgba(255,255,255,0.4); font-size: 11px; margin-top: 8px; letter-spacing: 1px;">Kingdom Supply Drop</p>
        </div>
    </div>`;

    // THE FIX: Wrapping it in the Grid if you haven't already
    const finalCode = `
<div class="grid grid-cols-1 md:grid-cols-3 gap-12 w-full">
    ${itemCode}
</div>`;

    outputBox.value = finalCode.trim();
}
