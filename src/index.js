import "./styles/style.css";
import { getWeatherData } from "./weatherService";

const location = document.querySelector("#location");
const weatherDisplay = document.querySelector(".weather");
const btnSearch = document.querySelector(".btn-search");

btnSearch.addEventListener("click", () => {
  getWeatherData(location.value)
    .then((data) => {
      console.log("data ", data);
      const temp = data.currentConditions.temp;
      weatherDisplay.textContent = `Temperature: ${temp}C`;
    })
    .catch((error) => console.log(error));
});
