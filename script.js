// Navigation toggle
function showSection(id, btn) {
  // Hide all sections and header
  document.querySelectorAll('section,header').forEach(sec => sec.style.display = 'none');
  // Show the selected section
  document.getElementById(id).style.display = 'block';
  // Update active nav button
  document.querySelectorAll('.nav-links button').forEach(b => b.classList.remove('active'));
  if (btn) btn.classList.add('active');
}

// Auto-fill date/time fields
document.addEventListener("DOMContentLoaded", () => {
  const today = new Date();
  document.getElementById("regDate").value = today.toISOString().split("T")[0];
  document.getElementById("regTime").value = today.toTimeString().slice(0,5);
});

// Slot tracking for Addis Ababa locations
const slots = {
  Bole: 8,
  Piazza: 8,
  Mexico: 8,
  "Sar Bet": 8,
  "4 Kilo": 8
};

const form = document.getElementById('regForm');
form.addEventListener('submit', async function(e) {
  e.preventDefault();
  const location = document.getElementById('location').value;

  if (location && slots[location] > 0) {
    slots[location]--;
    alert(`Registered for ${location}! Spots left: ${slots[location]}`);
  } else if (location) {
    alert(`Sorry, ${location} is full.`);
  }

  // Continue with SheetDB submission
  const data = {
    Name: document.getElementById('name').value,
    Email: document.getElementById('email').value,
    Phone: document.getElementById('phone').value,
    Country: document.getElementById('country').value,
    City: document.getElementById('city').value,
    Location: location,
    "Registration Date": document.getElementById('regDate').value,
    "Registration Time": document.getElementById('regTime').value
  };

  await fetch("https://sheetdb.io/api/v1/9q45d3e7oe5ks", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ data })
  });

  form.reset();
});

// Hamburger toggle for mobile nav
document.getElementById('menuToggle').addEventListener('click', function() {
  const menu = document.getElementById('hamburgerMenu');
  if (menu.style.display === 'block') {
    menu.style.display = 'none';
  } else {
    menu.style.display = 'block';
  }
});

// Close hamburger menu after selecting a button
document.querySelectorAll('#hamburgerMenu button').forEach(btn => {
  btn.addEventListener('click', () => {
    document.getElementById('hamburgerMenu').style.display = 'none';
  });
});


// Hamburger toggle for mobile nav
document.getElementById('menuToggle').addEventListener('click', function() {
  const menu = document.getElementById('hamburgerMenu');
  if (menu.style.display === 'block') {
    menu.style.display = 'none';
  } else {
    menu.style.display = 'block';
  }
});

// Close hamburger menu after selecting a button
document.querySelectorAll('#hamburgerMenu button').forEach(btn => {
  btn.addEventListener('click', () => {
    document.getElementById('hamburgerMenu').style.display = 'none';
  });
});

// Hamburger toggle for mobile nav with animation
document.getElementById('menuToggle').addEventListener('click', function() {
  const menu = document.getElementById('hamburgerMenu');
  menu.classList.toggle('show');
});

// Close hamburger menu after selecting a button
document.querySelectorAll('#hamburgerMenu button').forEach(btn => {
  btn.addEventListener('click', () => {
    document.getElementById('hamburgerMenu').classList.remove('show');
  });
});



