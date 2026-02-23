function navigateTo(id) {
  document.querySelectorAll('.hero, .page').forEach(section => {
    section.style.display = 'none';
  });

  if (id === 'home') {
    document.getElementById('home').style.display = 'flex';
  } else {
    document.getElementById(id).style.display = 'block';
  }

  window.scrollTo({ top: 0, behavior: 'smooth' });
}

/* PARALLAX HERO */
window.addEventListener('scroll', () => {
  const hero = document.querySelector('.hero');
  if (hero.style.display !== 'none') {
    hero.style.backgroundPositionY = window.scrollY * 0.4 + "px";
  }
});

/* Placeholder logic hook for your API */
document.getElementById('regForm').addEventListener('submit', function(e){
  e.preventDefault();
  alert("Seat Reserved! (Reconnect API here)");
});
