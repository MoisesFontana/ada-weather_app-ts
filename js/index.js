"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
const form = document.querySelector("#search-form");
const input = document.querySelector("#input-location");
const weatherInfo = document.querySelector("#weather-info");
const OpenWeatherMapApiKey = "Put Your Key Here!";
const capitalizeFirstLetter = (text) => {
    return text.charAt(0).toUpperCase() + text.slice(1);
};
form === null || form === void 0 ? void 0 : form.addEventListener("submit", (event) => __awaiter(void 0, void 0, void 0, function* () {
    event.preventDefault();
    if (!input || !weatherInfo)
        return;
    const location = input.value;
    if (location.length < 3) {
        alert("A cidade deve ter pelo menos 3 letras!");
        return;
    }
    try {
        const response = yield fetch(`https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=${OpenWeatherMapApiKey}&lang=pt_br&units=metric`);
        const data = yield response.json();
        const infos = {
            temperature: Math.round(data.main.temp) + "°C",
            city: data.name,
            icon: `https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`,
            description: capitalizeFirstLetter(data.weather[0].description),
        };
        weatherInfo.innerHTML = `
      <div class="weather-data">
         <h2>${infos.city}</h2>

         <span>${infos.temperature}</span>
      </div>
      <span class="weather-description">
         ${infos.description}
         <img
            src="${infos.icon}"
            alt="Imagem que mostra as condições do clima"
         />
      </span>
   `;
    }
    catch (error) {
        console.log("Ocorreu um erro na obtenção dos dados!", error);
    }
}));
