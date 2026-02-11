const menuToggle = document.getElementById('menu-toggle');
const navLinks = document.getElementById('nav-links');

menuToggle.addEventListener('click', () => {
  navLinks.classList.toggle('active-menu');
});

function showSection(id, btn) {
  // Hide all containers
  document.querySelectorAll('section, header, #home-content').forEach(el => {
    el.style.display = 'none';
  });
  
  if (id === 'home') {
    document.getElementById('home').style.display = 'flex';
    document.getElementById('home-content').style.display = 'block';
  } else {
    document.getElementById(id).style.display = 'block';
  }
  
  // Nav styling
  document.querySelectorAll('.nav-links button').forEach(b => b.classList.remove('active'));
  if (btn) btn.classList.add('active');

  navLinks.classList.remove('active-menu');
  window.scrollTo({top: 0, behavior: 'smooth'});
}

document.addEventListener("DOMContentLoaded", () => {
  lucide.createIcons();
  
  const today = new Date();
  const dateF = document.getElementById("regDate");
  const timeF = document.getElementById("regTime");
  if(dateF) dateF.value = today.toISOString().split("T")[0];
  if(timeF) timeF.value = today.toTimeString().slice(0,5);
});

// SheetDB & Slots Logic
const slots = { Bole: 8, Piazza: 8, Mexico: 8, "Sar Bet": 8, "4 Kilo": 8 };
const form = document.getElementById('regForm');

if(form) {
  form.addEventListener('submit', async function(e) {
    e.preventDefault();
    const loc = document.getElementById('location').value;

    if (loc && slots[loc] <= 0) {
      alert(`Sorry, ${loc} is full.`);
      return;
    }

    if (loc) slots[loc]--;

    const data = {
      Name: document.getElementById('name').value,
      Email: document.getElementById('email').value,
      Phone: document.getElementById('phone').value,
      Country: document.getElementById('country').value,
      City: document.getElementById('city').value,
      Location: loc,
      "Registration Date": document.getElementById('regDate').value,
      "Registration Time": document.getElementById('regTime').value
    };

    try {
      await fetch("https://sheetdb.io/api/v1/9q45d3e7oe5ks", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ data })
      });
      alert(loc ? `Confirmed for ${loc}.` : "Registration Successful.");
      form.reset();
    } catch (err) {
      alert("Registration error. Please try again.");
    }
  });
}
