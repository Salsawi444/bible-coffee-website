function showSection(id, btn) {
  document.querySelectorAll('section,header').forEach(sec => sec.style.display = 'none');
  document.getElementById(id).style.display = 'block';
}

document.addEventListener("DOMContentLoaded", () => {
  const today = new Date();
  document.getElementById("regDate").value = today.toISOString().split("T")[0];
  document.getElementById("regTime").value = today.toTimeString().slice(0,5);
});

// Hamburger toggle
document.getElementById('menuToggle').addEventListener('click', () => {
  const menu = document.getElementById('hamburgerMenu');
  menu.classList.toggle('show');
});

// Close menu after selecting
document.querySelectorAll('#hamburgerMenu button').forEach(btn => {
  btn.addEventListener('click', () => {
    document.getElementById('hamburgerMenu').classList.remove('show');
  });
});
