
// Initial slots per location
const slots = {
  Bali: 8,
  Mexico: 8
};

const form = document.getElementById('registrationForm');
const availability = document.getElementById('availability');

// Show initial availability
function updateAvailability() {
  availability.innerHTML = `
    Bali: ${slots.Bali} spots left<br>
    Mexico: ${slots.Mexico} spots left
  `;
}
updateAvailability();

// Handle registration
form.addEventListener('submit', function(e) {
  e.preventDefault();
  const location = document.getElementById('location').value;

  if (slots[location] > 0) {
    slots[location]--;
    alert(`Registered for ${location}!`);
  } else {
    alert(`Sorry, ${location} is full.`);
  }
  updateAvailability();
});
