function getWeather() {
  const apiKey = "26245b49b07897beb24ccac7ed7005a4";
  const city = document.getElementById("city").value;

  if (!city) {
    alert("Please enter a city name.");
    return;
  }

  const currentWeatherUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`;
  const forecastUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}`;

  fetch(currentWeatherUrl)
  .then(response => response.json())
  .then(data => {
    displayWeather(data);
  })
  .catch(error => {
    console.error("Error fetching current weather:", error);
    alert("Error fetching current weather. Please try again.");
  });

  fetch(forecastUrl)
  .then(response => response.json())
  .then(data => {
    displayHourlyForecast(data.list);
  })
  .catch(error => {
    console.error("Error fetching forecast:", error);
    alert("Error fetching forecast. Please try again.");
  });
}