const options = {
    enableHighAccuracy: true,
    timeout: 10000,
    maximumAge: 0,
};

function success(pos) {
    const crd = pos.coords;

    console.log("Your current position is:");
    console.log(`Latitude : ${crd.latitude}`);
    console.log(`Longitude: ${crd.longitude}`);
    console.log(`More or less ${crd.accuracy} meters.`);

    fetch(`https://www.wttr.in/${crd.latitude},${crd.longitude}?format=j1`)
        .then(response => response.json())
        .then(result => {
            const TemperatureIcon = document.getElementById("currentTempIcon");
            TemperatureIcon.classList.add("wi-day-sunny");
            TemperatureIcon.classList.add("animate-spin-slow")
            document.getElementById("currentTempValue").textContent = result.current_condition[0].temp_C + "°C";

            let location = `${result.nearest_area[0].areaName[0].value}, ${result.nearest_area[0].region[0].value}`
            console.log(location)
            document.getElementById("location").textContent = location;
            document.getElementById("location").insertAdjacentHTML('beforebegin', "<i class=\"fa-solid fa-location-pin\"></i>")
            /*          document.querySelector('#currentTemp').textContent = result.current_condition[0].temp_C + "°C";
                        document.querySelector('#location').textContent = result.nearest_area[0].areaName[0].value;
                        document.querySelector('#averageTemp').textContent = result.weather[0].avgtempC + "°C";
                        document.querySelector('#minTemp').textContent = result.weather[0].mintempC + "°C";
                        document.querySelector('#maxTemp').textContent = result.weather[0].maxtempC + "°C"; */
        })
        .catch(err => console.warn(err))
}

function error(err) {
    console.warn(`ERROR(${err.code}): ${err.message} `);
}

navigator.geolocation.getCurrentPosition(success, error, options);
