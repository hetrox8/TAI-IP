const getWeather = () => {
  const API_KEY = '77e3592e90da87ef13f5cfd4e8b59f10'; // Replace with your actual API key
  const city = document.getElementById("cityInput").value;

  fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`)
    .then(response => response.json())
    .then(data => {
      const weatherInfo = document.querySelector('.weather-info'); // Corrected selector

      if (data.cod === '404') {
        weatherInfo.innerHTML = "<p>City not found</p>";
      } else {
        const temperature = data.main.temp;
        const description = data.weather[0].description;
        const icon = data.weather[0].icon;

        weatherInfo.innerHTML = `
          <p>Temperature: ${temperature}°C</p>
          <p>Description: ${description}</p>
          <img src="http://openweathermap.org/img/w/${icon}.png" alt="weather icon">
        `;
      }
    })
    .catch(error => {
      // Log any errors to the console
      console.error('Error fetching weather data:', error);
    });
}
