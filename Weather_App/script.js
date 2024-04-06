document.addEventListener('DOMContentLoaded', function() {
  const queryString = window.location.search;
  const urlParams = new URLSearchParams(queryString);
  const city = urlParams.get('city');

  if (window.location.pathname.includes('result.html')) {
    if (city) {
      getWeather(city);
    }
  }

  const searchBtn = document.getElementById('searchBtn');
  const cityInput = document.getElementById('cityInput');

  searchBtn.addEventListener('click', function() {
    const city = cityInput.value;
    window.location.href = `result.html?city=${encodeURIComponent(city)}`;
  });

  function getWeather(city) { // Move the function declaration here
    const API_KEY = '77e3592e90da87ef13f5cfd4e8b59f10';
    const weatherInfo = document.querySelector('.weather-info');

    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`)
      .then(response => response.json())
      .then(data => {
        if (data.cod === '404') {
          weatherInfo.innerHTML = "<p>City not found</p>";
        } else {
          const temperature = data.main.temp;
          const description = data.weather[0].description;
          const icon = data.weather[0].icon;
          const humidity = data.main.humidity;

          const temperatureIcon = '<i class="fas fa-temperature-high"></i>';
          const humidityIcon = '<i class="fas fa-tint"></i>';

          weatherInfo.innerHTML = `
            <h2 class="head-w">Weather in ${city}</h2>
            <img src="http://openweathermap.org/img/w/${icon}.png" alt="weather icon">
            <p class="head-p">${temperatureIcon} Temperature: ${temperature}°C</p>
            <p class="head-p">${description}</p>
            <p class="head-p">${humidityIcon} Humidity: ${humidity}%</p> 
          `;
          weatherInfo.style.display = 'block';
        }
      })
      .catch(error => {
        console.error('Error fetching weather data:', error);
        weatherInfo.innerHTML = "<p>Error fetching weather data</p>";
      });
  };
});
