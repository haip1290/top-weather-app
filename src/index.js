import "./styles/style.css";
import { getWeatherData } from "./weatherService";
import { getGif, getConditionIcon } from "./gifService";

const location = document.querySelector("#searching-location");
const btnSearch = document.querySelector(".btn-search");

btnSearch.addEventListener("click", () => {
  const loadingDisplay = document.querySelector(".loading-icon");
  loadingDisplay.style.display = "block";
  getWeatherData(location.value)
    .then((data) => {
      loadingDisplay.style.display = "none";
      displayWeather(data);
    })
    .catch((error) => {
      loadingDisplay.style.display = "block";
      console.log(error);
    });
});

function displayWeather(data) {
  displayWeatherHeader(data.location);
  displayTemp(data.temperature, data.days[0].icon);
  displayDescription(data.description);
  displayGif(data.days[0].conditions);
  displayDayWeather(data.days);
}

function displayWeatherHeader(location) {
  const span = document.createElement("span");
  span.classList.add("h-location");
  span.textContent = location;

  const headerDiv = document.querySelector(".header");
  headerDiv.textContent = "Weather of ";
  headerDiv.appendChild(span);
}

function displayTemp(temperature, icon) {
  const gifSpan = document.querySelector(".temp-gif");
  gifSpan.src = getConditionIcon(icon);

  const tempSpan = document.querySelector(".temp-numb");
  tempSpan.textContent = temperature;

  const unitSpan = document.querySelector(".temp-unit");
  unitSpan.textContent = "°C";
}

function displayDescription(description) {
  const desDiv = document.querySelector(".description");
  desDiv.textContent = description;
}

function displayGif(conditions) {
  const gifDiv = document.querySelector(".gif");
  const weather = conditions.split(" ").at(-1);
  getGif(weather).then((data) => (gifDiv.src = data));
}

function displayDayWeather(days) {
  const container = document.querySelector(".days-container");
  container.textContent = "";
  days.forEach((day) => {
    const dayElement = buildDayElement(day);
    container.appendChild(dayElement);
  });
}

function buildDayElement(data) {
  const dayDiv = document.createElement("div");
  dayDiv.classList.add("day-weather");

  const dateDiv = document.createElement("div");
  dateDiv.classList.add("date");
  dayDiv.appendChild(dateDiv);
  dateDiv.textContent = data.dayOfWeek;

  const iconImg = document.createElement("img");
  iconImg.src = getConditionIcon(data.icon);

  const iconDiv = document.createElement("div");
  iconDiv.classList.add("day-icon");
  iconDiv.appendChild(iconImg);
  dayDiv.appendChild(iconDiv);

  const dayTemp = document.createElement("div");
  dayDiv.appendChild(dayTemp);

  const tempMaxDiv = document.createElement("span");
  tempMaxDiv.classList.add("temp-max");
  tempMaxDiv.textContent = `${data.tempmax}° `;
  dayTemp.appendChild(tempMaxDiv);

  const tempMinDiv = document.createElement("span");
  tempMinDiv.classList.add("temp-min");
  tempMinDiv.textContent = `${data.tempmin}°`;
  dayTemp.appendChild(tempMinDiv);

  return dayDiv;
}
