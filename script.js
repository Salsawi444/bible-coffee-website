const menuToggle = document.getElementById('menu-toggle');
const navLinks = document.getElementById('nav-links');

menuToggle.addEventListener('click', () => { navLinks.classList.toggle('active-menu'); });

function showSection(id, btn) {
    document.querySelectorAll('.hidden-section').forEach(el => el.style.display = 'none');
    const homeWrapper = document.getElementById('home-wrapper');
    
    if (id === 'home') { homeWrapper.style.display = 'block'; } 
    else { homeWrapper.style.display = 'none'; document.getElementById(id).style.display = 'block'; }

    document.querySelectorAll('.nav-links button').forEach(b => b.classList.remove('active'));
    if (btn) btn.classList.add('active');
    navLinks.classList.remove('active-menu');
    window.scrollTo({top: 0, behavior: 'smooth'});
}

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => { if (entry.isIntersecting) entry.target.classList.add('visible'); });
}, { threshold: 0.1 });

document.addEventListener("DOMContentLoaded", () => {
    lucide.createIcons();
    document.querySelectorAll('.scroll-reveal').forEach(el => observer.observe(el));
    const today = new Date();
    if(document.getElementById("regDate")) document.getElementById("regDate").value = today.toISOString().split("T")[0];
    if(document.getElementById("regTime")) document.getElementById("regTime").value = today.toTimeString().slice(0,5);
});
