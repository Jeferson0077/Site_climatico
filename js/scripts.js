// Variaveis e seleção de elementos
// i3HmszLu6lUPe6NsZ2z36TZ87Puliiv-wPKFI8iknl0  chave api imagens de fundo
const apikey = "2e1ce8e95af3a420a0918f1261a5a30b"; // chave api detalhes do clima
const apiCountryurl = "https://flagcdn.com/w40/";

const cityInput = document.querySelector("#city-input");
const searchBtn = document.querySelector("#search");

const cityElement = document.querySelector("#city");
const tempElement = document.querySelector("#temperature span");
const descElement = document.querySelector("#description");
const weatherIconElement = document.querySelector("#weather-icon");
const countryElement = document.querySelector("#country");
const humidityElement = document.querySelector("#humidity span");
const windElement = document.querySelector("#wind span");

const weatherContainer = document.querySelector("#weather-data");

const errorMessage = document.querySelector("#error-message");

const getBgImage = async (city) => {
    const apiUnsplashURL = `https://api.unsplash.com/photos/random?query=${city}&client_id=i3HmszLu6lUPe6NsZ2z36TZ87Puliiv-wPKFI8iknl0`;
    const res = await fetch(apiUnsplashURL);
    const data = await res.json();

    document.body.style.backgroundImage = `url(${data.urls.regular})`;
    document.body.style.backgroundSize = "cover";
    document.body.style.backgroundPosition = "center";
};



// Funções
const getWeatherData = async (city) => {
    const apiWeatherURL = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apikey}&lang=pt_br`;

    const res = await fetch(apiWeatherURL);
    const data = await res.json();

    return data;
};

const showWeatherData = async (city) => {
    if (!city) {
        errorMessage.innerText = "Insira uma cidade!";
        return;
    }

    const data = await getWeatherData(city);

    if (data.cod === "404") {
        errorMessage.innerText = "Cidade não encontrada!";
        return;
    }

    errorMessage.innerText = ""; // limpa a mensagem quando encontrar
    await getBgImage(city);

    cityElement.innerText = data.name;
    tempElement.innerText = parseInt(data.main.temp - 273.15);
    descElement.innerText = data.weather[0].description;
    weatherIconElement.setAttribute("src", `https://openweathermap.org/img/wn/${data.weather[0].icon}.png`);

    countryElement.setAttribute("src", `${apiCountryurl}${data.sys.country.toLowerCase()}.png`);
    humidityElement.innerText = `${data.main.humidity}%`;
    windElement.innerText = `${data.wind.speed}km/h`;

    weatherContainer.classList.remove("hide");
};

// Eventos
searchBtn.addEventListener("click", (e) => {
    e.preventDefault();

    const city = cityInput.value;

    showWeatherData(city);

});

cityInput.addEventListener("keyup", (e) => {
    if (e.code === "Enter") {
        const city = e.target.value;

        showWeatherData(city);
    }
})