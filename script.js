const menuToggle = document.getElementById('menu-toggle');
const navLinks = document.getElementById('nav-links');

menuToggle.addEventListener('click', () => {
    navLinks.classList.toggle('active-menu');
});

function showSection(id, btn) {
    // Hide all main containers
    document.querySelectorAll('.section-container, #home-wrapper').forEach(el => {
        el.style.display = 'none';
    });
    
    // Show selected
    if (id === 'home') {
        document.getElementById('home-wrapper').style.display = 'block';
    } else {
        document.getElementById(id).style.display = 'block';
    }
    
    // Nav Active State
    document.querySelectorAll('.nav-links button').forEach(b => b.classList.remove('active'));
    if (btn) btn.classList.add('active');

    navLinks.classList.remove('active-menu');
    window.scrollTo({top: 0, behavior: 'smooth'});
}

document.addEventListener("DOMContentLoaded", () => {
    lucide.createIcons();
    
    // BACKGROUND TIMESTAMP LOGIC
    const today = new Date();
    const dateInput = document.getElementById("regDate");
    const timeInput = document.getElementById("regTime");
    
    if(dateInput) dateInput.value = today.toISOString().split("T")[0];
    if(timeInput) timeInput.value = today.toTimeString().slice(0,5);
});

// SheetDB Logic (Wait for your specific code to refine)
const form = document.getElementById('regForm');
if(form) {
    form.addEventListener('submit', async function(e) {
        e.preventDefault();
        // This is where your original SheetDB fetch logic will go.
        alert("Preparing to submit to your database...");
    });
}
