(() => {
  const menuToggle = document.getElementById('menuToggle');
  const primaryNav = document.getElementById('primaryNav');

  menuToggle.addEventListener('click', () => {
    const isOpen = primaryNav.classList.toggle('open');
    menuToggle.setAttribute('aria-expanded', String(isOpen));
    menuToggle.setAttribute('aria-label', isOpen ? 'Close navigation' : 'Open navigation');
    menuToggle.textContent = isOpen ? '✕' : '☰';
  });

  primaryNav.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      primaryNav.classList.remove('open');
      menuToggle.setAttribute('aria-expanded', 'false');
      menuToggle.setAttribute('aria-label', 'Open navigation');
      menuToggle.textContent = '☰';
    });
  });

  document.getElementById('year').textContent = new Date().getFullYear();

  // Event filtering: all entries point visitors to organizers for confirmed details.
  const eventSearch = document.getElementById('eventSearch');
  const eventFilter = document.getElementById('eventFilter');
  const eventRows = [...document.querySelectorAll('.event-row')];
  const noEvents = document.getElementById('noEvents');

  function filterEvents() {
    const query = eventSearch.value.trim().toLowerCase();
    const category = eventFilter.value;
    let visible = 0;
    eventRows.forEach(row => {
      const matchesText = (row.dataset.search + ' ' + row.textContent).toLowerCase().includes(query);
      const matchesCategory = category === 'all' || row.dataset.category === category;
      const show = matchesText && matchesCategory;
      row.hidden = !show;
      if (show) visible++;
    });
    noEvents.hidden = visible !== 0;
  }
if (eventSearch && eventFilter && noEvents) {
  eventSearch.addEventListener('input', filterEvents);
  eventFilter.addEventListener('change', filterEvents);
}

  // Directory category pills and search work together.
  const directorySearch = document.getElementById('directorySearch');
  const directoryCards = [...document.querySelectorAll('.directory-card')];
  const filterPills = [...document.querySelectorAll('[data-dir-filter]')];
  const noDirectory = document.getElementById('noDirectory');
  let activeDirectoryFilter = 'all';

  function filterDirectory() {
    const query = directorySearch.value.trim().toLowerCase();
    let visible = 0;
    directoryCards.forEach(card => {
      const text = (card.dataset.search + ' ' + card.textContent).toLowerCase();
      const show = (activeDirectoryFilter === 'all' || card.dataset.category === activeDirectoryFilter) && text.includes(query);
      card.hidden = !show;
      if (show) visible++;
    });
    noDirectory.hidden = visible !== 0;
  }
if (directorySearch) directorySearch.addEventListener('input', filterDirectory);
  filterPills.forEach(button => {
    button.addEventListener('click', () => {
      activeDirectoryFilter = button.dataset.dirFilter;
      filterPills.forEach(pill => {
        const active = pill === button;
        pill.classList.toggle('active', active);
        pill.setAttribute('aria-pressed', String(active));
      });
      filterDirectory();
    });
    button.setAttribute('aria-pressed', String(button.classList.contains('active')));
  });

if (typeof form !== "undefined" && form) {
  form.addEventListener('submit', event => {
    const title = document.getElementById('suggestionTitle').value.trim();

    if (!title) {
      alert('Please enter a title for your suggestion.');
      return;
    }

    form.action = 'https://formsubmit.co/gabeandadrianmovies@gmail.com';
    form.method = 'POST';
  });
}

})();

// ===== BOYDS BUSINESS DIRECTORY FILTER ===== (() => { const search = document.getElementById("businessSearch"); const list = document.getElementById("businessList"); const emptyMessage = document.getElementById("businessEmpty"); const filterButtons = document.querySelectorAll(".boyds-filter"); // If the directory isn't on this page, safely stop. if (!search || !list || !emptyMessage) return; let activeCategory = "all"; function filterBusinesses() { const query = search.value.trim().toLowerCase(); const cards = list.querySelectorAll(".boyds-card"); let visibleCount = 0; cards.forEach((card) => { const category = card.dataset.category || ""; const text = card.textContent.toLowerCase(); const matchesCategory = activeCategory === "all" || category === activeCategory; const matchesSearch = text.includes(query); const show = matchesCategory && matchesSearch; card.hidden = !show; if (show) visibleCount++; }); emptyMessage.hidden = visibleCount !== 0; } search.addEventListener("input", filterBusinesses); filterButtons.forEach((button) => { button.addEventListener("click", () => { activeCategory = button.dataset.category || "all"; filterButtons.forEach((item) => { const selected = item === button; item.classList.toggle("active", selected); item.setAttribute("aria-pressed", String(selected)); }); filterBusinesses(); }); button.setAttribute( "aria-pressed", String(button.classList.contains("active")) ); }); filterBusinesses(); })();
/*
/* BOYDS DIRECTORY SEARCH AND FILTERS */
document.addEventListener("DOMContentLoaded", () => {
  const searchInput = document.getElementById("directorySearch");
  const directoryGrid = document.getElementById("directoryGrid");
  const countText = document.getElementById("directoryCount");
  const emptyMessage = document.getElementById("directoryEmpty");
  const filterButtons = document.querySelectorAll(".filter-button");

  // Stop safely if the directory isn't on this page.
  if (!searchInput || !directoryGrid) return;

  const cards = Array.from(
    directoryGrid.querySelectorAll(".directory-card")
  );

  let selectedCategory = "all";

  function updateDirectory() {
    const searchTerm = searchInput.value.trim().toLowerCase();
    let visibleCount = 0;

    cards.forEach((card) => {
      const category = card.dataset.category || "";
      const searchableText = (
        card.innerText + " " + (card.dataset.search || "")
      ).toLowerCase();

      const matchesCategory =
        selectedCategory === "all" ||
        category === selectedCategory;

      const matchesSearch = searchableText.includes(searchTerm);
      const shouldShow = matchesCategory && matchesSearch;

      card.hidden = !shouldShow;

      if (shouldShow) visibleCount++;
    });

    countText.textContent =
      visibleCount === 1
        ? "Showing 1 result"
        : `Showing ${visibleCount} results`;

    emptyMessage.hidden = visibleCount !== 0;
  }

  searchInput.addEventListener("input", updateDirectory);

  filterButtons.forEach((button) => {
    button.addEventListener("click", () => {
      selectedCategory = button.dataset.filter;

      filterButtons.forEach((otherButton) => {
        const isActive = otherButton === button;
        otherButton.classList.toggle("active", isActive);
        otherButton.setAttribute("aria-pressed", String(isActive));
      });

      updateDirectory();
    });
  });

  // Set up the initial result count.
  filterButtons.forEach((button) => {
    button.setAttribute(
      "aria-pressed",
      String(button.dataset.filter === "all")
    );
  });

  updateDirectory();
});
/* ===================================
   BOYDS WEATHER
=================================== */

document.addEventListener("DOMContentLoaded", () => {
  const temperature = document.getElementById("weatherTemperature");
  const description = document.getElementById("weatherDescription");
  const icon = document.getElementById("weatherIcon");
  const feelsLike = document.getElementById("weatherFeels");
  const humidity = document.getElementById("weatherHumidity");
  const wind = document.getElementById("weatherWind");
  const updated = document.getElementById("weatherUpdated");
  const forecast = document.getElementById("weatherForecast");
  const refreshButton = document.getElementById("refreshWeather");

  // Only run on a page that has the weather section.
  if (!temperature || !refreshButton) return;

  const weatherDescriptions = {
    0: ["Clear sky", "☀️"],
    1: ["Mostly clear", "🌤️"],
    2: ["Partly cloudy", "⛅"],
    3: ["Overcast", "☁️"],
    45: ["Foggy", "🌫️"],
    48: ["Foggy", "🌫️"],
    51: ["Light drizzle", "🌦️"],
    53: ["Drizzle", "🌦️"],
    55: ["Heavy drizzle", "🌧️"],
    61: ["Light rain", "🌦️"],
    63: ["Rain", "🌧️"],
    65: ["Heavy rain", "🌧️"],
    71: ["Light snow", "🌨️"],
    73: ["Snow", "❄️"],
    75: ["Heavy snow", "❄️"],
    80: ["Rain showers", "🌦️"],
    81: ["Rain showers", "🌧️"],
    82: ["Heavy rain showers", "⛈️"],
    95: ["Thunderstorm", "⛈️"],
    96: ["Thunderstorm with hail", "⛈️"],
    99: ["Severe thunderstorm with hail", "⛈️"]
  };

  function getWeatherInfo(code) {
    return weatherDescriptions[code] || ["Conditions unavailable", "🌤️"];
  }

  function showError() {
    description.textContent = "Weather is temporarily unavailable.";
    updated.textContent =
      "Check your internet connection and try again.";
    forecast.textContent = "Forecast unavailable right now.";
  }

  async function loadWeather() {
    refreshButton.disabled = true;
    refreshButton.textContent = "Loading weather...";

    description.textContent = "Getting current conditions...";
    updated.textContent = "Connecting to weather service...";

    const params = new URLSearchParams({
      latitude: "39.1834",
      longitude: "-77.3136",
      current: [
        "temperature_2m",
        "relative_humidity_2m",
        "apparent_temperature",
        "weather_code",
        "wind_speed_10m"
      ].join(","),
      daily: [
        "weather_code",
        "temperature_2m_max",
        "temperature_2m_min"
      ].join(","),
      temperature_unit: "fahrenheit",
      wind_speed_unit: "mph",
      timezone: "America/New_York",
      forecast_days: "4"
    });

    const url =
      "https://api.open-meteo.com/v1/forecast?" + params.toString();

    try {
      const response = await fetch(url);

      if (!response.ok) {
        throw new Error("Weather request failed");
      }

      const data = await response.json();
      const current = data.current;
      const daily = data.daily;

      if (!current || !daily) {
        throw new Error("Weather data is incomplete");
      }

      const currentInfo = getWeatherInfo(current.weather_code);

      temperature.textContent =
        `${Math.round(current.temperature_2m)}°`;

      description.textContent = currentInfo[0];
      icon.textContent = currentInfo[1];

      feelsLike.textContent =
        `${Math.round(current.apparent_temperature)}°F`;

      humidity.textContent =
        `${current.relative_humidity_2m}%`;

      wind.textContent =
        `${Math.round(current.wind_speed_10m)} mph`;

      const updateTime = new Date(current.time);

      updated.textContent =
        `Updated ${updateTime.toLocaleTimeString("en-US", {
          hour: "numeric",
          minute: "2-digit",
          timeZone: "America/New_York"
        })} local time`;

      forecast.replaceChildren();

      daily.time.forEach((date, index) => {
        const dayInfo = getWeatherInfo(daily.weather_code[index]);
        const dateObject = new Date(`${date}T12:00:00`);

        const dayName = index === 0
          ? "Today"
          : dateObject.toLocaleDateString("en-US", {
              weekday: "short",
              timeZone: "America/New_York"
            });

        const card = document.createElement("div");
        card.className = "forecast-day";

        const name = document.createElement("span");
        name.className = "forecast-name";
        name.textContent = dayName;

        const weatherIcon = document.createElement("span");
        weatherIcon.className = "forecast-icon";
        weatherIcon.textContent = dayInfo[1];

        const high = document.createElement("strong");
        high.textContent =
          `${Math.round(daily.temperature_2m_max[index])}°`;

        const low = document.createElement("span");
        low.className = "forecast-low";
        low.textContent =
          `${Math.round(daily.temperature_2m_min[index])}° low`;

        card.append(name, weatherIcon, high, low);
        forecast.appendChild(card);
      });
    } catch (error) {
      showError();
    } finally {
      refreshButton.disabled = false;
      refreshButton.textContent = "Refresh weather ↻";
    }
  }

  refreshButton.addEventListener("click", loadWeather);
  loadWeather();
});


/* ===================================
   BOYDS SUGGESTION FORM
=================================== */

document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("suggestionForm");
  const status = document.getElementById("suggestionStatus");

  if (!form) return;

  form.addEventListener("submit", (event) => {
    const type = document.getElementById("suggestionType").value;
    const title = document.getElementById("suggestionTitle").value.trim();
    const details = document.getElementById("suggestionDetails").value.trim();

    if (!type || !title || !details) {
      event.preventDefault();

      if (status) {
        status.textContent = "Please complete all fields first.";
      }

      return;
    }

    // Let the normal HTML form submission happen.
    // FormSubmit will handle sending the email.
  });
});