
const apiKey = "https://api.openweathermap.org/data/2.5/weather?q=Delhi&appid=YOUR_API_KEY&units=metric";
const searchBtn = document.getElementById("searchBtn");
const cityInput = document.getElementById("cityInput");
const weatherResult = document.getElementById("weatherResult");
const historyList = document.getElementById("history");


console.log("Script Loaded");

window.onload = function () {
    console.log("Page Loaded");
    loadHistory();
}


searchBtn.addEventListener("click", () => {

    const city = cityInput.value;

    if (city === "") {
        weatherResult.innerHTML = "Please enter a city name";
        return;
    }

    getWeather(city);
});


async function getWeather(city) {

    console.log("Fetching weather...");

    try {

        const response = await fetch(
            `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`
        );

        console.log("Fetch request sent");

        if (!response.ok) {
            throw new Error("City not found");
        }

        const data = await response.json();

        console.log("Data received");

        displayWeather(data);
        saveCity(city);

    }
    catch (error) {

        console.log("Error occurred:", error);

        weatherResult.innerHTML = "Error: " + error.message;
    }

    console.log("Function finished");

}

function displayWeather(data) {

    const city = data.name;
    const temp = data.main.temp;
    const condition = data.weather[0].description;

    weatherResult.innerHTML = `
        <h2>${city}</h2>
        <p>Temperature: ${temp} °C</p>
        <p>Condition: ${condition}</p>
    `;
}


function saveCity(city) {

    let cities = JSON.parse(localStorage.getItem("cities")) || [];

    if (!cities.includes(city)) {
        cities.push(city);
        localStorage.setItem("cities", JSON.stringify(cities));
    }

    loadHistory();
}


function loadHistory() {

    historyList.innerHTML = "";

    let cities = JSON.parse(localStorage.getItem("cities")) || [];

    cities.forEach(city => {

        const li = document.createElement("li");
        li.textContent = city;

        li.addEventListener("click", () => {
            getWeather(city);
        });

        historyList.appendChild(li);
    });

}
