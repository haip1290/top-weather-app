const baseURL = "https://api.giphy.com/v1/gifs/translate";
const key = "qbVteMU0x15vSUNLLkKHYRWeJQkCwymH";

async function getGif(searchWord) {
  const api = `${baseURL}?api_key=${key}&s=${searchWord}`;
  try {
    const response = await fetch(api, { mode: "cors" });
    if (!response.ok) {
      handleError(response.status);
    }
    const data = await response.json();
    return data.data.images.original.url;
  } catch (error) {
    console.log(error);
  }
}

function handleError(status) {
  if (status === 401) {
    throw new Error("Unauthorized: Wrong API Key");
  } else if (status === 404) {
    throw new Error("Not Found: No GIF found for this search");
  } else {
    throw new Error(`Error ${status}`);
  }
}

const iconNameContainer = {
  "partly-cloudy-day": "partly_cloudy",
  cloudy: "cloudy",
  rain: "rain_s_cloudy",
  sunny: "sunny_s_cloudy",
  clear: "sunny",
  "clear-day": "sunny",
  snow: "snow",
};

function getConditionIcon(condition) {
  const iconName = iconNameContainer[condition];
  const icon = `https://ssl.gstatic.com/onebox/weather/64/${iconName}.png`;
  return icon;
}

export { getGif, getConditionIcon };
