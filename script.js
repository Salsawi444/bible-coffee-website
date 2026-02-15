/* --- BIBLE & COFFEE CORE SCRIPT --- */

// 1. NAVIGATION & SECTION CONTROL
function showSection(sectionId, element) {
    // Hide all sections
    document.querySelectorAll('.section-container').forEach(s => {
        s.style.display = 'none';
        s.classList.add('hidden');
    });
    
    // Hide home wrapper specifically
    const homeWrapper = document.getElementById('home-wrapper');
    if (homeWrapper) {
        homeWrapper.style.display = 'none';
    }

    // Show target section
    const target = document.getElementById(sectionId);
    if (target) {
        target.style.display = 'block';
        target.classList.remove('hidden');
    } else if (sectionId === 'home' && homeWrapper) {
        homeWrapper.style.display = 'block';
    }

    // Update active button state
    document.querySelectorAll('.nav-links button').forEach(b => b.classList.remove('active'));
    if (element) element.classList.add('active');

    // Close mobile menu if open
    const navLinks = document.getElementById('nav-links');
    if (navLinks) navLinks.classList.remove('active-menu');
}

// 2. MOBILE MENU TOGGLE
const menuToggle = document.getElementById('menu-toggle');
const navLinks = document.getElementById('nav-links');

if (menuToggle && navLinks) {
    menuToggle.addEventListener('click', () => {
        navLinks.classList.toggle('active-menu');
    });
}

// 3. HOST MODAL TOGGLE
function toggleHostModal() {
    const modal = document.getElementById('hostModal');
    if (modal) {
        modal.classList.toggle('hidden');
    }
}

// 4. THE WHATSAPP MESSAGE (YOUR EXACT FORMAT)
const hostForm = document.getElementById('hostForm');
if (hostForm) {
    hostForm.addEventListener('submit', function(e) {
        e.preventDefault();

        // Get data from your fields
        const name = document.getElementById('hostName').value;
        const country = document.getElementById('hostCountry').value;
        const city = document.getElementById('hostCity').value;
        const phone = document.getElementById('hostPhone').value;

        // EXACT FORMAT REQUESTED
        const message = `Hello my name is ${name} here are my details\n` +
                        `Country: ${country}\n` +
                        `City: ${city}\n` +
                        `Phone: ${phone}`;
        
        const whatsappUrl = `https://wa.me/251910884584?text=${encodeURIComponent(message)}`;
        window.open(whatsappUrl, '_blank');
        
        toggleHostModal(); // Close modal after sending
    });
}

// 5. ICON INITIALIZATION
if (window.lucide) {
    lucide.createIcons();
}
