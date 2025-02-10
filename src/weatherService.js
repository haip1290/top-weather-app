const baseURL =
  "https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/";
const key = "8YG2RJXPDZ9SBUD69PL4DXHX9";
const time = "next7days";

async function getWeatherData(location) {
  const api = `${baseURL}${location}/${time}?unitGroup=metric&key=${key}&contentType=json`;
  try {
    const response = await fetch(api, { mode: "cors" });
    const data = await response.json();
    return mapAPIResponse(data);
  } catch (error) {
    console.log(error);
  }
}

function mapAPIResponse(apiResponse) {
  console.log("response: ", apiResponse);
  return {
    temperature: apiResponse.currentConditions?.temp ?? "N/A",
    location: apiResponse.resolvedAddress ?? "Unknown Location",
    description: apiResponse.description ?? "N/A",
    days: apiResponse.days?.map((day) => ({
      datetime: day.datetime ?? "N/A",
      dayOfWeek: getDayOfWeek(day.datetime),
      conditions: day.conditions,
      tempmax: day.tempmax ?? "N/A",
      tempmin: day.tempmin ?? "N/A",
    })),
  };
}

function getDayOfWeek(dateString) {
  const date = new Date(dateString);
  return date.toLocaleDateString("en-US", { weekday: "long" });
}

export { getWeatherData };
