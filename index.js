const apiKey = "c17dab0f85fd956d5fb6c9f04f125055";
const apiUrl =
  "https://api.openweathermap.org/data/2.5/weather?units=metric&lang=ru&q=";
const searchBox = document.querySelector(".search input");
const searchBtn = document.querySelector(".search button");
const weatherIcon = document.querySelector(".weather-icon");

async function checkWeather(city) {
  const response = await fetch(apiUrl + city + `&appid=${apiKey}`);
  if (response.status === 404) {
    document.querySelector(".error").style.display = "block";
  }
  let data = await response.json();
  console.log(data);

  document.querySelector(".city").innerHTML = data.name;
  document.querySelector(".temp").innerHTML = Math.round(data.main.temp) + "°C";
  document.querySelector(".humidity").innerHTML = data.main.humidity + "%";
  document.querySelector(".wind").innerHTML = data.wind.speed + "км/ч";

  weatherIcon.src = `https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`;
  weatherIcon.title = data.weather[0].description;

  document.querySelector(".weather").style.display = "block";
  document.querySelector(".error").style.display = "none";
}

searchBox.addEventListener("keypress", function (e) {
  let key = e.which || e.keyCode;
  if (key === 13) {
    // код клавиши Enter
    searchBtn.click();
  }
});

searchBtn.addEventListener("click", () => {
  if (searchBox.value.includes(" ")) {
    searchBox.value = searchBox.value.replace(/ /g, "%20");
    searchBox.value.toLowerCase();
  }
  checkWeather(searchBox.value);
  searchBox.value = "";
});
