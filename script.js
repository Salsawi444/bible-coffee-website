const menuToggle = document.getElementById('menu-toggle');
const navLinks = document.getElementById('nav-links');

menuToggle.addEventListener('click', () => {
  navLinks.classList.toggle('active-menu');
});

function showSection(id, btn) {
  // Hide all sections and the home wrapper
  document.querySelectorAll('section').forEach(el => el.style.display = 'none');
  const homeWrapper = document.getElementById('home-wrapper');
  
  if (id === 'home') {
    homeWrapper.style.display = 'block';
  } else {
    homeWrapper.style.display = 'none';
    document.getElementById(id).style.display = 'block';
  }
  
  document.querySelectorAll('.nav-links button').forEach(b => b.classList.remove('active'));
  if (btn) btn.classList.add('active');

  navLinks.classList.remove('active-menu');
  window.scrollTo({top: 0, behavior: 'smooth'});
}

document.addEventListener("DOMContentLoaded", () => {
  lucide.createIcons();
  const today = new Date();
  if(document.getElementById("regDate")) document.getElementById("regDate").value = today.toISOString().split("T")[0];
  if(document.getElementById("regTime")) document.getElementById("regTime").value = today.toTimeString().slice(0,5);
});

// Original logic remains for slots and SheetDB
const slots = { Bole: 8, Piazza: 8, Mexico: 8, "Sar Bet": 8, "4 Kilo": 8 };
const form = document.getElementById('regForm');
if(form) {
  form.addEventListener('submit', async function(e) {
    e.preventDefault();
    // Submission code...
    alert("Registration submitted.");
  });
}
