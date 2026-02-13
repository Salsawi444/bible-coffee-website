// Initialize Lucide Icons
lucide.createIcons();

// Mobile Menu Toggle
const menuToggle = document.getElementById('menu-toggle');
const navLinks = document.getElementById('nav-links');

menuToggle.addEventListener('click', () => {
    navLinks.classList.toggle('active-menu');
});

// Section Switching Logic
function showSection(sectionId, btn = null) {
    // List all sections
    const sections = ['home-wrapper', 'magazine', 'merch', 'join'];
    
    // Hide everyone
    sections.forEach(id => {
        const el = document.getElementById(id);
        if (el) el.classList.add('hidden');
    });

    // Show target
    const target = (sectionId === 'home') ? 'home-wrapper' : sectionId;
    document.getElementById(target).classList.remove('hidden');

    // Update active button color
    if (btn) {
        document.querySelectorAll('.nav-links button').forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
    }

    // Close mobile menu after clicking
    navLinks.classList.remove('active-menu');

    // Scroll to top smoothly
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

// Form Submission
document.getElementById('regForm').addEventListener('submit', function(e) {
    e.preventDefault();
    alert('Processing your reservation...');
    this.reset();
});
