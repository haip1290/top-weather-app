const baseURL =
  "https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/";
const key = "8YG2RJXPDZ9SBUD69PL4DXHX9";

async function getWeatherData(location) {
  const api = `${baseURL}${location}/today?unitGroup=metric&key=${key}&contentType=json`;
  console.log(api);
  try {
    const response = await fetch(api, { mode: "cors" });
    const data = await response.json();
    return data;
  } catch (error) {
    console.log(error);
  }
}

export { getWeatherData };
