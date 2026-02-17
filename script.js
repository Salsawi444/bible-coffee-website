function updateLocations() {
    const countrySel = document.getElementById('country');
    const citySel = document.getElementById('city');
    const locSel = document.getElementById('location');
    
    if (!locSel) return; // Safety check
    
    const country = countrySel.value;
    const city = citySel.value;
    
    // Clear current locations
    locSel.innerHTML = '<option value="" disabled selected>SELECT TABLE</option>';
    
    // Check if we have specific locations for this city
    if (globalData[country] && globalData[country].locations && globalData[country].locations[city]) {
        globalData[country].locations[city].forEach(loc => {
            let opt = document.createElement('option');
            opt.value = loc;
            opt.innerHTML = loc.toUpperCase();
            locSel.appendChild(opt);
        });
    } else {
        // THE FAILSAFE: If no specific coffee shop is listed yet
        let opt = document.createElement('option');
        opt.value = "General Protocol";
        opt.innerHTML = "GENERAL GATHERING (TBA)";
        locSel.appendChild(opt);
    }
}
