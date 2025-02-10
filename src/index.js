import "./styles/style.css";
import { getWeatherData } from "./weatherService";
import { getGif } from "./gifService";

const location = document.querySelector("#searching-location");
const btnSearch = document.querySelector(".btn-search");

btnSearch.addEventListener("click", () => {
  getWeatherData(location.value)
    .then((data) => {
      console.log("data ", data);
      displayWeather(data);
    })
    .catch((error) => console.log(error));
});

function displayWeather(data) {
  displayWeatherHeader(data.location);
  displayTemp(data.temperature);
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

function displayTemp(temperature) {
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
  getGif(conditions).then((data) => (gifDiv.src = data));
}

function displayDayWeather(days) {
  const container = document.querySelector(".days-container");
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
