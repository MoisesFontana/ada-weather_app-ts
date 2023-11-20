const form = document.querySelector("#search-form");
const input: HTMLInputElement | null =
   document.querySelector("#input-location");
const weatherInfo = document.querySelector("#weather-info");

const capitalizeFirstLetter = (text: string) => {
   return text.charAt(0).toUpperCase() + text.slice(1);
};

form?.addEventListener("submit", async (event) => {
   event.preventDefault();

   if (!input || !weatherInfo) return;

   const location = input.value;

   if (location.length < 3) {
      alert("A cidade deve ter pelo menos 3 letras!");
      return;
   }

   try {
      const response = await fetch(
         `https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=8acd4b62052718c5359c5c0f43ebb3c3&lang=pt_br&units=metric`
      );
      const data = await response.json();

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
   } catch (error) {
      console.log("Ocorreu um erro na obtenção dos dados!", error);
   }
});
