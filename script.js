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
    },

    "Canada": {
        cities: ["Toronto", "Vancouver", "Regina"],
        locations: {
            "Toronto": ["DOWNTOWN", "NORTH YORK", "MISSISSAUGA"],
            "Vancouver": ["KITSILANO", "RICHMOND"],
            "Regina": ["WASCANA CENTER", "SASKATCHEWAN MUSEUM"]
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

/**
 * THE PLATINUM LIVE-SYNC ENGINE & GLOBAL ARCHITECTURE
 * Final Build [2026-02-19]
 */

// Global Configuration
const API_URL = "https://sheetdb.io/api/v1/9q45d3e7oe5ks"; 
const DESKTOP_POS = { titleY: 0, contentY: 0, globalX: 0 }; // Default safety values

/* --- 1. FORM LOGIC: COUNTRY -> CITY --- */
function updateCities() {
    const country = document.getElementById('country').value;
    const citySelect = document.getElementById('city');
    citySelect.innerHTML = '<option value="" disabled selected>SELECT CITY</option>';

    const cityMap = {
        "Ethiopia": ["ADDIS ABABA", "DIRE DAWA", "MEKELLE", "GONDAR", "BAHIR DAR", "HAWASSA", "JIMMA", "BISHOFTU"],
        "Canada": ["TORONTO", "CALGARY", "REGINA", "VANCOUVER"],
        "Germany": ["FRANKFURT", "BERLIN", "MUNICH", "HAMBURG"],
        "South Africa": ["JOBURG", "CAPE TOWN", "DURBAN", "PRETORIA"],
        "Kenya": ["NAIROBI", "MOMBASA", "KISUMU"],
        "USA": ["DALLAS", "NEW YORK", "LOS ANGELES", "CHICAGO"],
        "UAE": ["DUBAI", "ABU DHABI"],
        "Uganda": ["KAMPALA"],
        "Rwanda": ["KIGALI"],
        "Sweden": ["STOCKHOLM"],
        "Norway": ["OSLO"],
        "Finland": ["HELSINKI"],
        "Italy": ["ROME", "MILAN"],
        "Netherlands": ["AMSTERDAM"]
    };

    if (cityMap[country]) {
        cityMap[country].forEach(city => {
            citySelect.add(new Option(city, city));
        });
    }
}

/* --- 2. FORM LOGIC: CITY -> LOCATION --- */
function updateLocations() {
    const city = document.getElementById('city').value;
    const locationSelect = document.getElementById('location');
    locationSelect.innerHTML = '<option value="" disabled selected>SELECT LOCATION</option>';

    const locationMap = {
        // ETHIOPIA (8 Major Locations for Addis)
        "ADDIS ABABA": [
            "Bole Atlas // The Cup", 
            "Piazza // Tomoca Coffee", 
            "Sarbet // Shala Park", 
            "Old Airport // Kaldi's HQ", 
            "Kazanchis // Jupiter Terrace", 
            "Meskel Square // Hyatt Regency Loft", 
            "Bole Medhanialem // Edelweiss", 
            "Entoto Park // Viewing Deck"
        ],
        "DIRE DAWA": ["Kezira // Taiwan Market Hub", "Dire Dawa Station Cafe"],
        "MEKELLE": ["Romanat Square // Coffee House", "Mekelle University Lounge"],
        "GONDAR": ["Fasil Ghebbi Environs", "Goha Hotel Terrace"],
        "BAHIR DAR": ["Lake Tana Waterfront", "Kuriftu Resort Cafe"],
        "HAWASSA": ["Lake View Drive", "Haile Resort Lounge"],
        "JIMMA": ["Coffee Birthplace Hub", "Central Jimma Hotel"],
        "BISHOFTU": ["Kuriftu Lake Terrace", "Liesak Sanctuary"],

        // CANADA
        "REGINA": [
            "Royal Saskatchewan Museum", 
            "Wascana Centre // Willow Island", 
            "Legislative Assembly Grounds", 
            "Victoria Park // Downtown Hub"
        ],
        "TORONTO": ["Distillery District", "CN Tower // 360", "Yorkville // Balzac’s", "High Park // Nature Retreat"],
        "CALGARY": ["Stephen Avenue Walk", "Calgary Tower // Sky 360", "Prince's Island Park", "Mount Royal // Deville Coffee"],
        "VANCOUVER": ["Stanley Park Totems", "Granville Island Market", "Gastown Steam Clock"],

        // GERMANY & RSA
        "FRANKFURT": ["Main Tower // Level 4", "Römerberg Square"],
        "JOBURG": ["Sandton City // Nelson Mandela Square", "Rosebank // Starbucks Reserve", "Maboneng // Arts on Main"],
        
        // KENYA
        "NAIROBI": ["Westlands Hub", "Karen // Giraffe Centre Café", "CBD // Java House"]
    };

    if (locationMap[city]) {
        locationMap[city].forEach(loc => {
            locationSelect.add(new Option(loc, loc));
        });
    }
}

/* --- 3. THE PLATINUM LIVE-SYNC ENGINE --- */
async function syncPlatinumEvents() {
    // Specifically targets the 'Events' sheet tab
    const eventApiURL = `${API_URL}?sheet=Events`;
    
    try {
        console.log("Platinum Engine: Initiating Sync...");
        const response = await fetch(eventApiURL);
        const data = await response.json();

        // Loop through the 3 UI cards
        for (let i = 1; i <= 3; i++) {
            const card = document.getElementById(`city-${i}`);
            // Safety check: ensure data exists for this row
            if (!data[i - 1]) continue; 
            
            const item = data[i - 1]; 

            if (card) {
                const cityName = item.City || item.city;
                const loc = item.Location || item.location;
                const seats = item.Seats || item.seats;
                const status = (item.Status || item.status || "").toLowerCase();

                // Update text if data exists
                if (cityName) card.querySelector('.city-name').innerText = cityName.toUpperCase();
                if (loc) card.querySelector('.city-location').innerText = loc;
                if (seats) card.querySelector('.city-seats').innerText = seats.toString().padStart(2, '0');

                // Update Status & Visuals
                const statusTag = card.querySelector('.city-status');
                if (statusTag) {
                    statusTag.innerText = status === 'full' ? 'FULL' : 'ACTIVE';
                    
                    if (status === 'full') {
                        card.style.opacity = "0.4";
                        card.style.pointerEvents = "none";
                        statusTag.style.color = "#7f1d1d";
                        statusTag.style.borderColor = "rgba(127, 29, 29, 0.3)";
                    } else {
                        card.style.opacity = "1";
                        card.style.pointerEvents = "auto";
                        statusTag.style.color = "#FCA311";
                        statusTag.style.borderColor = "rgba(252, 163, 17, 0.3)";
                    }
                }
            }
        }
        console.log("Platinum Engine: Live Sync Complete.");
    } catch (error) {
        console.error("Platinum Engine Error:", error);
    }
}

/* --- 4. INITIALIZATION & SUBMISSION HANDLER --- */
document.addEventListener('DOMContentLoaded', () => {
    // 1. Run the Sync immediately
    syncPlatinumEvents();

    // 2. Menu Toggle
    const menuBtn = document.getElementById('menu-toggle');
    const navLinks = document.getElementById('nav-links');
    if (menuBtn && navLinks) { 
        menuBtn.addEventListener('click', () => { navLinks.classList.toggle('active-menu'); }); 
    }

    // 3. Icons
    if (window.lucide) { lucide.createIcons(); }

    // 4. Desktop Positioning (Safety Check)
    if (window.innerWidth >= 1024) {
        const title = document.querySelector('.brand-block h1');
        const content = document.querySelector('.brand-block > div');
        const wrapper = document.querySelector('.brand-block');
        
        // Only apply if elements exist
        if (title) title.style.transform = `translateY(${DESKTOP_POS.titleY}px)`;
        if (content) content.style.transform = `translateY(${DESKTOP_POS.contentY}px)`;
        if (wrapper) wrapper.style.transform = `translateX(${DESKTOP_POS.globalX}px)`;
    }

    // 5. Form Submission Logic
    const form = document.getElementById('regForm');
    if (form) {
        form.addEventListener("submit", async (e) => {
            e.preventDefault();
            const btnText = document.getElementById('btn-text');
            if(btnText) btnText.innerHTML = "LOCKING RESERVATION...";
            
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
                    // Assume showSuccess() is defined in your HTML script tag or you can alert
                    if (typeof showSuccess === "function") {
                        showSuccess();
                    } else {
                        alert("Reservation Locked. Welcome to the Table.");
                    }
                    form.reset(); 
                    if(btnText) btnText.innerHTML = "RESERVE YOUR SEAT";
                } else { 
                    throw new Error('Network response error'); 
                }
            } catch (err) { 
                alert("Protocol Interrupted. Please try again."); 
                if(btnText) btnText.innerHTML = "RESERVE YOUR SEAT"; 
            }
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
