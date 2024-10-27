const card = document.querySelector('#card');
const currentHour = new Date().getHours();
if (currentHour >= 18 || currentHour < 6) {
    card.style.background = `
    linear-gradient(146deg, rgba(25,25,112,0.8) 0%, rgba(72,61,139,0.85) 50%, rgba(0,0,51,0.9) 100%),
    radial-gradient(circle at 30% 30%, rgba(255, 255, 255, 0.3), rgba(255, 255, 255, 0) 20%),
    radial-gradient(circle at 70% 70%, rgba(255, 255, 255, 0.2), rgba(255, 255, 255, 0) 20%)
    `;
    card.style.border = '0.3px solid voilet';
} //else {
//card.style.background = "linear-gradient(146deg, rgba(31,195,193,0.34) 0%, rgba(1,45,187,0.53) 100%)";
//card.style.backgroundImage = "none"; // Clear any background image
//}
const apikey = '2a19cbcd1b105f6ee37111528b3e0794';
const apiurl = 'https://api.openweathermap.org/data/2.5/weather?units=metric&q=';
const userser = document.querySelector('#search-city');
const srcbtn = document.querySelector('#srcbtn');
const weticon = document.querySelector('#weather-icon')
const type = document.querySelector('#type')
async function checkWeather(city) {
    const response = await fetch(apiurl + city + `&appid=${apikey}`);
    var data = await response.json();
    console.log(data);

    card.style.display = "none";
    setTimeout(() => {
        card.style.display = "block";
    }, 1);

    // If city doesn't exist or wasn't found
    if (data.cod == 404) {
        weticon.src = "error.png";
        card.style.background = "linear-gradient(90deg, rgba(158,33,33,1) 0%, rgba(113,12,12,1) 100%)";
        document.querySelector('#temp').innerHTML = "Error";
        document.querySelector('#city').innerHTML = "City not found";
        document.querySelector('#humi').innerHTML = "";
        document.querySelector('#Speed').innerHTML = "";
    }
    else {
        card.style.background = `
            linear-gradient(146deg, rgba(25,25,112,0.8) 0%, rgba(72,61,139,0.85) 50%, rgba(0,0,51,0.9) 100%),
            radial-gradient(circle at 30% 30%, rgba(255, 255, 255, 0.3), rgba(255, 255, 255, 0) 20%),
            radial-gradient(circle at 70% 70%, rgba(255, 255, 255, 0.2), rgba(255, 255, 255, 0) 20%)
            `;
    }
    // document.querySelector('#st').innerHTML=
    document.querySelector('#city').innerHTML = data.name + " (" + data.sys.country + ")";
    document.querySelector('#temp').innerHTML = data.main.temp + "&deg;c";
    document.querySelector('#humi').innerHTML = data.main.humidity + "%";
    document.querySelector('#Speed').innerHTML = data.wind.speed + " km/h";
    const currentHour = new Date().getHours();
    if (data.weather[0].main == "Clear") {
        if (currentHour >= 18 || currentHour < 6) {
            weticon.src = "moon.png";
            // weticon.style.filter = 'brightness(-20%)';// Use moon icon if it's nighttime
        } else {
            weticon.src = "clear.png"; // Use sun icon during the day
        }
        type.innerHTML = "Clear weather";
    }
    else if (data.weather[0].main == "Thunderstorm") {
        weticon.src = "thunder.png";
        type.innerHTML = "Thunderstorm";
    }
    else if (data.weather[0].main == "Rain") {
        weticon.src = "rain.png";
        type.innerHTML = "HeavyRain";
    }
    else if (data.weather[0].main == "Drizzle") {
        weticon.src = "drizzle.png";
        type.innerHTML = "Light rain";
    }
    else if (data.weather[0].main == "Clouds") {
        weticon.src = "cloudy.png";
        type.innerHTML = "Cloudy";
    }
    else if (data.weather[0].main == "Haze") {
        weticon.src = "mist.png";
        type.innerHTML = "Haze/Fogg";
    }
    else if (data.weather[0].main == "Mist") {
        weticon.src = "mist.png";
        type.innerHTML = "Haze/Fogg";
    }
}
srcbtn.addEventListener("click", () => {
    checkWeather(userser.value);
})
userser.addEventListener("keydown", (event) => {
    if (event.key === "Enter") {  // Check if 'Enter' key is pressed
        checkWeather(userser.value);
    }
});
// checkWeather();