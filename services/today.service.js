 // services/today.service.js
import { getWeather } from "./weather.service.js";
import { getJsonData } from "./scraping.service.js";
export const getFantasticJsonData = async ({ latitude, longitude }) => {
    try {
    const random_number = Math.floor(Math.random()*7);
    const weatherData = (await getWeather({ latitude, longitude }))[random_number];  
    const credoData = (await getJsonData())[random_number];   
    return { weatherData, credoData };
  } catch (e) {
    throw Error("Error while getting JSON.");
} };
