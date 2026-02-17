/* --- THE MIGHTY EVENT FORGE --- */
function generateActiveTables() {
    const eventContainer = document.querySelector('#events .max-w-6xl div.border-t');
    if (!eventContainer) return;

    eventContainer.innerHTML = ''; // Wipe the old static rows

    // This scans EVERY country and EVERY city in your Database
    Object.keys(globalData).forEach(country => {
        globalData[country].cities.forEach(city => {
            // FOR NOW: We assume 7/10 seats for all cities to make it look "Active"
            // Later you can make this specific per city
            const seatsSecured = 7; 
            const totalSeats = 10;
            const isFull = seatsSecured >= totalSeats;

            const row = `
                <div class="group border-b border-white/10 py-16 hover:bg-[#FCA311]/[0.02] transition-all duration-700 cursor-pointer" 
                     onclick="showSection('join')">
                    <div class="flex flex-col md:flex-row md:items-center justify-between gap-8">
                        <div class="flex items-center gap-8">
                            <span class="radar-dot status-active"></span>
                            <div>
                                <h4 class="text-white font-['Oswald'] text-5xl md:text-7xl uppercase tracking-tighter group-hover:translate-x-4 transition-transform duration-500">${city}</h4>
                                <p class="text-white/30 font-['Inter'] text-xs tracking-[4px] uppercase mt-2">${country} // FRIDAY SEQUENCE</p>
                            </div>
                        </div>
                        <div class="flex flex-col items-end gap-4">
                            <span class="text-[#FCA311] font-['Oswald'] text-sm tracking-[3px]">${seatsSecured}/${totalSeats} SECURED</span>
                            <div class="h-[1px] w-32 bg-white/10 group-hover:w-48 group-hover:bg-[#FCA311] transition-all duration-700"></div>
                        </div>
                    </div>
                </div>`;
            eventContainer.innerHTML += row;
        });
    });
}

// Add this to your existing window.onload or DOMContentLoaded
document.addEventListener('DOMContentLoaded', generateActiveTables);
