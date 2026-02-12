const menuToggle = document.getElementById('menu-toggle');
const navLinks = document.getElementById('nav-links');

// THE SURGICAL SWITCHER
function showSection(id, btn) {
    // Force hide everything
    document.querySelectorAll('.section-container, #home-wrapper').forEach(el => {
        el.style.setProperty('display', 'none', 'important');
    });

    // Force show target
    const target = (id === 'home') ? document.getElementById('home-wrapper') : document.getElementById(id);
    if(target) {
        target.style.setProperty('display', 'block', 'important');
    }

    // UI Updates
    document.querySelectorAll('.nav-links button').forEach(b => b.classList.remove('active'));
    const activeBtn = btn || document.querySelector(`.nav-links button[onclick*="'${id}'"]`);
    if (activeBtn) activeBtn.classList.add('active');
    
    navLinks.classList.remove('active-menu');
    window.scrollTo(0, 0);
}

// VIDEO OVERLAY
function openVideo(videoId) {
    const overlay = document.createElement('div');
    overlay.style = "position:fixed; top:0; left:0; width:100%; height:100%; background:rgba(0,0,0,0.98); z-index:10000; display:flex; align-items:center; justify-content:center; padding:10px;";
    overlay.innerHTML = `
        <div style="position:relative; width:100%; max-width:850px; aspect-ratio:16/9; background:#000;">
            <button onclick="this.parentElement.parentElement.remove()" style="position:absolute; top:-40px; right:0; color:#FCA311; background:none; border:none; cursor:pointer;">CLOSE [X]</button>
            <iframe width="100%" height="100%" src="https://www.youtube-nocookie.com/embed/${videoId}?autoplay=1" frameborder="0" allowfullscreen></iframe>
        </div>`;
    document.body.appendChild(overlay);
}

// SHEETDB & REGISTRATION (Keep exactly as is)
const db = { "Ethiopia": { "Addis Ababa": ["Bole", "Mexico"] }, "USA": { "Dallas": ["Downtown"] } };
function updateCities() { /* ... same logic as before ... */ }
async function checkSlots() { /* ... same logic as before ... */ }

document.getElementById('regForm')?.addEventListener('submit', async function(e) {
    e.preventDefault();
    // Your POST logic to SheetDB remains here
    console.log("Form Submitted to SheetDB");
});

menuToggle.addEventListener('click', () => navLinks.classList.toggle('active-menu'));
