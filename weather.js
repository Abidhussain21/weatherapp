
 
  
  function getWeather() {
    const city = document.getElementById("cityInput").value|| 'Delhi';

    fetch(`http://api.openweathermap.org/data/2.5/weather?q=${city}&appid=0c2b4f75ab1d29218c1aafd825162590&units=metric`)
        .then(response => response.json())
        .then(data => {
            var currentWeather = document.getElementById("currentWeather");
            currentWeather.innerHTML = `
                <div class="weather-card">
                    <h2>Current Weather in ${city}</h2>
                    <p>Temperature: ${data.main.temp}°C</p>
                    <p>Humidity: ${data.main.humidity}%</p>
                    <p>condition:${data.weather[0].description}</p>
                    <p>Wind Speed: ${data.wind.speed} m/s</p>
                    <p>Date/Time: ${new Date(data.dt * 1000).toLocaleString()}</p>
                </div>
            `;
        })
        .catch(error => {
            console.log("Error fetching current weather:", error);
        });
        

    fetch(`http://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=0c2b4f75ab1d29218c1aafd825162590&units=metric&cnt=8`)
        .then(response => response.json())
        .then(data => {
            var forecastWeather = document.getElementById("forecastWeather");
            forecastWeather.innerHTML = `
                <div class="weather-card">
                    <h2>Weather Forecast for Next 7 Days in ${city}</h2>
                    <p><strong>Date/time</strong> | <strong>Temperature (°C)</strong> | <strong>Humidity (%)</strong> </strong></p>
            `;

            data.list.forEach(item => {
                forecastWeather.innerHTML += `
                    <p>${item.dt_txt} | ${item.main.temp}°C | ${item.main.humidity}% | ${item.wind.speed}m/s</p>
                `;
            });

            forecastWeather.innerHTML += `</div>`;
        })
        .catch(error => {
            console.log("Error fetching weather forecast:", error);
        });
        function getWeatherByCoordinates(lat, lon) {
          fetchWeatherData(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`)
            .then(data => {
              displayCurrentWeather(data);
              fetchForecastData(lat, lon);  // Fetch 7-day forecast using coordinates
            });
        }
        function fetchWeatherData(url) {
          return fetch(url)
            .then(response => response.json());
        }
}
