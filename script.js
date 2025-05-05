const apiKey = '8e7a7437fa5a39de3c08493e3b6a7f34';  // Replace with your OpenWeatherMap API key

// Fetch weather data
function getWeather() {
    const city = document.getElementById('cityInput').value;
    const weatherInfo = document.getElementById('weather-info');
    const error = document.getElementById('error');

    if (!city) {
        error.textContent = 'Please enter a city name.';
        
        weatherInfo.style.display = 'none';
        return;
    }

    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`)
        .then(response => response.json())
        .then(data => {
            if (data.cod === 200) {
                error.textContent = '';
                weatherInfo.style.display = 'block';

                weatherInfo.innerHTML = `
                    <h2>${data.name}</h2>
                    <img src="http://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png" alt="Weather icon" />
                    <p>Temperature: ${data.main.temp}°C</p>
                    <p>${data.weather[0].description}</p>
                `;
            } else {
                weatherInfo.style.display = 'none';
                error.textContent = 'City not found. Please try again.';
            }
        })
        .catch(() => {
            weatherInfo.style.display = 'none';
            error.textContent = 'An error occurred. Please try again later.';
        });
}
