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
            console.log(result);
            const TemperatureIcon = document.getElementById("currentTempIcon");
            TemperatureIcon.classList.add("wi-day-sunny");
            document.getElementById("currentTempValue").textContent = result.current_condition[0].temp_C + "°C";
            document.getElementById("currentTempDesc").textContent = result.current_condition[0].weatherDesc[0].value;

            let location = `${result.nearest_area[0].areaName[0].value}, ${result.nearest_area[0].region[0].value}`
            document.getElementById("location").innerHTML = "<i class=\"fa-solid fa-location-pin\"></i > " + location;

            document.getElementById("AvgTempValue").textContent = `Average: ${result.weather[0].avgtempC}°C`
            document.getElementById("MaxTempValue").textContent = `Max: ${result.weather[0].maxtempC}°C`
            document.getElementById("MinTempValue").textContent = `Min: ${result.weather[0].mintempC}°C`
        })
        .catch(err => console.warn(err))
}

function error(err) {
    console.warn(`ERROR(${err.code}): ${err.message} `);
}

navigator.geolocation.getCurrentPosition(success, error, options);
