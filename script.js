const API_URL = 'https://sheetdb.io/api/v1/9q45d3e7oe5ks';

function showSection(id, btn) {
    const sections = ['home-wrapper', 'magazine', 'merch', 'sermon', 'events', 'support', 'join'];
    sections.forEach(sid => {
        const el = document.getElementById(sid);
        if (el) { el.style.display = 'none'; el.classList.add('hidden'); }
    });

    if (id === 'home') {
        document.getElementById('home-wrapper').style.display = 'block';
        document.getElementById('home-wrapper').classList.remove('hidden');
    } else {
        const target = document.getElementById(id);
        if (target) { target.style.display = 'block'; target.classList.remove('hidden'); }
    }

    document.querySelectorAll('.nav-links button').forEach(b => b.classList.remove('active'));
    if (btn) btn.classList.add('active');
    document.getElementById('nav-links')?.classList.remove('active-menu');
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

// REST OF THE LOGIC (openVideo, checkSlots, updateCities, regForm listener) 
// STAYS EXACTLY AS YOU PROVIDED IN YOUR CODE SNIPPET.
