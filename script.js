// script.js

// Toggle weekly forecast visibility
function toggleForecast() {
  const forecast = document.getElementById("weeklyForecast");
  forecast.style.display = forecast.style.display === "none" ? "block" : "none";
}

// Moon phase calculation (simple approximation)
function getMoonPhase(date) {
  const year = date.getFullYear();
  const month = date.getMonth() + 1; // JS months start at 0
  const day = date.getDate();

  // Conway's algorithm for moon phase (0 = new moon, 4 = full moon)
  let r = year % 100;
  r %= 19;
  if (r > 9) r -= 19;
  r = ((r * 11) % 30) + month + day;
  if (month < 3) r += 2;
  const phase = r % 30;

  // Determine phase name & illumination
  if (phase < 2) return { name: "New Moon", class: "new-moon", illumination: 0 };
  if (phase < 7) return { name: "Waxing Crescent", class: "waxing-crescent", illumination: Math.floor((phase / 7) * 25) };
  if (phase < 9) return { name: "First Quarter", class: "first-quarter", illumination: 50 };
  if (phase < 14) return { name: "Waxing Gibbous", class: "waxing-gibbous", illumination: Math.floor(50 + ((phase - 9) / 5) * 25) };
  if (phase < 16) return { name: "Full Moon", class: "full-moon", illumination: 100 };
  if (phase < 21) return { name: "Waning Gibbous", class: "waning-gibbous", illumination: Math.floor(100 - ((phase - 16) / 5) * 25) };
  if (phase < 23) return { name: "Last Quarter", class: "last-quarter", illumination: 50 };
  return { name: "Waning Crescent", class: "waning-crescent", illumination: Math.max(0, Math.floor(25 - ((phase - 23) / 7) * 25)) };
}

// Update current moon phase
function updateCurrentPhase() {
  const today = new Date();
  const phaseData = getMoonPhase(today);

  const icon = document.getElementById("currentMoonIcon");
  const name = document.getElementById("currentPhaseName");
  const illum = document.getElementById("currentIllumination");
  const illumText = document.getElementById("currentIlluminationText");
  const dateEl = document.getElementById("currentDate");

  // Reset classes
  icon.className = "moon-visual " + phaseData.class;

  // Update UI
  name.textContent = phaseData.name;
  illum.textContent = phaseData.illumination + "%";
  illumText.textContent = `${phaseData.illumination}% Illuminated`;
  dateEl.textContent = today.toDateString();
}

// Generate 7-day forecast
function generateForecast() {
  const grid = document.getElementById("forecastGrid");
  grid.innerHTML = "";

  const today = new Date();

  for (let i = 1; i <= 7; i++) {
    const date = new Date();
    date.setDate(today.getDate() + i);

    const phaseData = getMoonPhase(date);

    const card = document.createElement("div");
    card.className = "forecast-card";

    card.innerHTML = `
      <div class="forecast-header">
        <div class="forecast-date">${date.toDateString()}</div>
        <div class="forecast-moon-container">
          <div class="forecast-moon ${phaseData.class}"></div>
          <div class="forecast-illumination">${phaseData.illumination}%</div>
        </div>
      </div>
      <div class="forecast-phase-name">${phaseData.name}</div>
      <div class="progress-bar">
        <div class="progress-fill" style="width: ${phaseData.illumination}%"></div>
      </div>
    `;

    grid.appendChild(card);
  }
}

// Initialize
updateCurrentPhase();
generateForecast();
