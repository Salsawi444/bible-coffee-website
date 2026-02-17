/* DESKTOP JOYSTICK */
const DESKTOP_POS = {
    titleY: 5,
    contentY: 0,
    globalX: -130
};

/* GLOBAL DATA */
const globalData = {
    "Ethiopia": {
        cities: ["Addis Ababa"],
        locations: { "Addis Ababa": ["Bole Atlas (The Cup)"] }
    }
};

/* NAVIGATION */
function showSection(id, btn) {
    const sections = ['home-wrapper'];
    sections.forEach(sectionId => {
        const el = document.getElementById(sectionId);
        if (el) el.style.display = 'none';
    });

    const target = (id === 'home')
        ? document.getElementById('home-wrapper')
        : document.getElementById(id);

    if (target) target.style.display = 'block';

    document.querySelectorAll('.nav-links button')
        .forEach(b => b.classList.remove('active'));

    if (btn) btn.classList.add('active');

    window.scrollTo({ top: 0, behavior: 'smooth' });
}

/* FIXED updateLocations */
function updateLocations() {
    const country = document.getElementById('country').value;
    const city = document.getElementById('city').value;
    const locSelect = document.getElementById('location');

    locSelect.innerHTML = '<option value="" disabled selected>SELECT LOCATION</option>';

    const countryKey = Object.keys(globalData).find(
        key => key.toLowerCase() === country.toLowerCase()
    );

    if (countryKey && globalData[countryKey].locations[city]) {
        globalData[countryKey].locations[city].forEach(loc => {
            let opt = document.createElement('option');
            opt.value = loc;
            opt.textContent = loc;
            locSelect.appendChild(opt);
        });
    }
}

/* DESKTOP JOYSTICK INIT */
document.addEventListener('DOMContentLoaded', () => {
    if (window.innerWidth >= 1024) {
        const title = document.querySelector('.brand-block h1');
        const content = document.querySelector('.brand-block > div');
        const wrapper = document.querySelector('.brand-block');

        if (title) title.style.transform = `translateY(${DESKTOP_POS.titleY}px)`;
        if (content) content.style.transform = `translateY(${DESKTOP_POS.contentY}px)`;
        if (wrapper) wrapper.style.transform = `translateX(${DESKTOP_POS.globalX}px)`;
    }
});
