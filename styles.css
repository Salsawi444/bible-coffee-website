:root {
    --gold: #FCA311;
    --black: #000000;
    --dark-gray: #050505;
    --border: rgba(255,255,255,0.1);
}

* { box-sizing: border-box; -webkit-tap-highlight-color: transparent; margin: 0; padding: 0; }
body { font-family: 'Inter', sans-serif; background: var(--black); color: #fff; overflow-x: hidden; }

/* Navigation */
nav { position: fixed; top: 0; width: 100%; z-index: 9999; background: rgba(0,0,0,0.95); backdrop-filter: blur(10px); border-bottom: 1px solid var(--border); height: 70px; display: flex; align-items: center; }
.nav-container { width: 100%; max-width: 1200px; margin: auto; display: flex; justify-content: space-between; padding: 0 20px; align-items: center; }
.brand-logo { font-family: 'Oswald'; font-weight: 700; font-size: 1.2rem; cursor: pointer; }
.brand-logo span { color: var(--gold); }

.nav-links { display: flex; gap: 25px; }
.nav-links button { color: rgba(255,255,255,0.5); font-size: 13px; font-weight: 700; text-transform: uppercase; font-family: 'Oswald'; transition: 0.3s; background: none; border: none; cursor: pointer; }
.nav-links button.active { color: var(--gold); }

@media(max-width: 900px) {
    .mobile-toggle { display: block; }
    .nav-links { position: fixed; top: 70px; left: 0; width: 100%; height: 0; background: var(--black); flex-direction: column; overflow: hidden; transition: 0.4s; }
    .nav-links.active-menu { height: 100vh; padding-top: 20px; }
    .nav-links button { font-size: 18px; padding: 20px; width: 100%; border-bottom: 1px solid var(--border); }
}

/* Hero */
.hero-container { position: relative; height: 100vh; display: flex; align-items: center; }
.hero-bg-layer { position: absolute; top: 0; left: 0; width: 100%; height: 100%; background: url('https://images.unsplash.com/photo-1511632765486-a01980e01a18?q=80&w=2070') center/cover; z-index: -1; }
.hero-overlay-layer { position: absolute; top: 0; left: 0; width: 100%; height: 100%; background: linear-gradient(180deg, transparent, #000); z-index: 0; }
.hero-content-layer { z-index: 10; padding: 20px; }
.responsive-title { display: block; font-family: 'Oswald'; font-size: clamp(3rem, 12vw, 6rem); line-height: 0.9; font-weight: 700; }
.gold-text { color: var(--gold); }

/* Forms */
.form-card { background: var(--dark-gray); padding: 30px; border: 1px solid var(--border); max-width: 500px; margin: 40px auto; }
.group { position: relative; margin-bottom: 25px; }
.floating-input { width: 100%; padding: 15px 5px; background: transparent; border: none; border-bottom: 1px solid #333; color: #fff; outline: none; }
.floating-label { position: absolute; left: 5px; top: 15px; color: #666; transition: 0.3s; pointer-events: none; font-size: 12px; text-transform: uppercase; }

.floating-input:focus ~ .floating-label, 
.floating-input:not(:placeholder-shown) ~ .floating-label { top: -10px; font-size: 10px; color: var(--gold); background: var(--dark-gray); padding: 0 5px; }

.submit-btn-premium { width: 100%; background: var(--gold); padding: 18px; font-family: 'Oswald'; font-weight: 700; cursor: pointer; border: none; }
.hidden { display: none !important; }
