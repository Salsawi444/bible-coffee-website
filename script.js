// Mobile Menu Toggle
const menuToggle = document.getElementById('menu-toggle');
const navLinks = document.getElementById('nav-links');

menuToggle.addEventListener('click', () => {
  navLinks.classList.toggle('active-menu');
});

// Navigation function
function showSection(id, btn) {
  // Hide all
  document.querySelectorAll('section,header').forEach(sec => sec.style.display = 'none');
  // Show selected
  document.getElementById(id).style.display = 'block';
  
  // Update buttons
  document.querySelectorAll('.nav-links button').forEach(b => b.classList.remove('active'));
  if (btn) btn.classList.add('active');

  // Close mobile menu after clicking
  navLinks.classList.remove('active-menu');
  window.scrollTo(0,0);
}

// Auto-fill date/time
document.addEventListener("DOMContentLoaded", () => {
  const today = new Date();
  document.getElementById("regDate").value = today.toISOString().split("T")[0];
  document.getElementById("regTime").value = today.toTimeString().slice(0,5);
  lucide.createIcons(); // Initialize icons
});

// Original Slot tracking
const slots = { Bole: 8, Piazza: 8, Mexico: 8, "Sar Bet": 8, "4 Kilo": 8 };

const form = document.getElementById('regForm');
form.addEventListener('submit', async function(e) {
  e.preventDefault();
  const location = document.getElementById('location').value;

  if (location && slots[location] > 0) {
    slots[location]--;
    alert(`Registered for ${location}! Spots left: ${slots[location]}`);
  } else if (location) {
    alert(`Sorry, ${location} is full.`);
    return;
  }

  const data = {
    Name: document.getElementById('name').value,
    Email: document.getElementById('email').value,
    Phone: document.getElementById('phone').value,
    Country: document.getElementById('country').value,
    City: document.getElementById('city').value,
    Location: location,
    "Registration Date": document.getElementById.value,
    "Registration Time": document.getElementById.value
  };

  await fetch("https://sheetdb.io/api/v1/9q45d3e7oe5ks", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ data })
  });

  form.reset();
});
