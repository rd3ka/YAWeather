const options = {
    enableHighAccuracy: true,
    timeout: 10000,
    maximumAge: 0,
};

/* fetching all the tag that will be updated with data */
const current = document.getElementById("current"),
    display = document.getElementById("disp"),
    wind = document.getElementById("wind"),
    humidity = document.getElementById("humidity");

function success(pos) {
    const crd = pos.coords;
    fetch(`https://v2.wttr.in/${crd.latitude},${crd.longitude}?format=j1`)
        .then(response => response.json())
        .then(result => {
            console.log(result);
            fetch('weatherCode.json')
                .then(response => response.json())
                .then(json => {
                    const icon = json[result.current_condition[0].weatherCode].iconD;
                    current.childNodes[1].children[0].classList.add(icon);
                })
                .catch(err => console.warn(err, "WeatherCode file not found!"))

            /* Updating fetched elements with data */
            current.childNodes[3].children[0].textContent = result.current_condition[0].weatherDesc[0].value;

            display.childNodes[1].firstElementChild.innerHTML = "<i class=\"fa-solid fa-location-pin\"></i > " +
                `${result.nearest_area[0].areaName[0].value}, ${result.nearest_area[0].region[0].value}`;
            display.childNodes[3].firstElementChild.textContent = result.current_condition[0].temp_C + "°C";

            const mma = [`Average: ${result.weather[0].avgtempC}°C`, `Max: ${result.weather[0].maxtempC}°C`, `Min: ${result.weather[0].mintempC}°C`];
            display.childNodes[5].childNodes.forEach((val, index) => val.textContent = mma[index]);

            wind.childNodes[1].classList.add("wi-strong-wind");
            wind.childNodes[3].textContent = `Windspeed: ±${result.current_condition[0].windspeedKmph}km/hr`;

            humidity.childNodes[1].classList.add("wi-humidity");
            humidity.childNodes[3].textContent = `Humidity: ±${result.current_condition[0].humidity}%`;
        })
        .catch(err => console.warn(err))
}

function error(err) {
    console.warn(`ERROR(${err.code}): ${err.message} `);
}
navigator.geolocation.getCurrentPosition(success, error, options);
