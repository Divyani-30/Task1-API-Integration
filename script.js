
const apiKey = 'a769f688d13bdef31cbff24d6f5d9f8a';//api key

async function getWeather() {
  const city = document.getElementById('cityInput').value.trim();
  const result = document.getElementById('weatherResult');

  if (!city) {
    result.innerHTML = "<p>Please enter a city name.</p>";
    return;
  }

  try {
    const res = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(city)}&appid=${apiKey}&units=metric`
    );

    if (!res.ok) {
      throw new Error("City not found or API error");
    }

    const data = await res.json();

    const html = `
      <h2>${data.name}, ${data.sys.country}</h2>
      <p><strong>Temperature:</strong> ${data.main.temp}°C</p>
      <p><strong>Weather:</strong> ${data.weather[0].main} - ${data.weather[0].description}</p>
      <p><strong>Humidity:</strong> ${data.main.humidity}%</p>
      <p><strong>Wind Speed:</strong> ${data.wind.speed} m/s</p>
    `;

    result.innerHTML = html;
  } catch (error) {
    result.innerHTML = `<p>Error: ${error.message}</p>`;
  }
}
