
async function weatherBallonWithLatLon(lat, lon) {

    var key = "eb15a680f9c90caad5a35788fbc2777f";
    var responce = await fetch('https://api.openweathermap.org/data/2.5/weather?lat=' + lat + '&lon=' + lon + '&appid=' + key);
    var data = await responce.json()
    drawWeather(data);
}

async function weatherBallonWithZip(zip) {

    var key = "eb15a680f9c90caad5a35788fbc2777f";
    var responce = await fetch('https://api.openweathermap.org/data/2.5/weather?zip=' + zip + '&appid=' + key);
    var data = await responce.json();
    drawWeather(data);

}

function drawWeather(d) {
    var celcius = Math.round(parseFloat(d.main.temp) - 273.15);
    var temp = Math.round(((parseFloat(d.main.temp) - 273.15) * 1.8) + 32);
    var min = Math.round(((parseFloat(d.main.temp_min) - 273.15) * 1.8) + 32);
    var max = Math.round(((parseFloat(d.main.temp_max) - 273.15) * 1.8) + 32);
    var dec = d.weather[0].description;
    var icon = d.weather[0].icon;
    var loc = d.name;
    fillData(temp, min, max, loc, dec, icon);

}

function fillData(temp, min, max, loc, dec, icon) {
    document.getElementById('description').innerHTML = dec;
    document.getElementById('temp').innerHTML = temp + '&deg;';
    document.getElementById('location').innerHTML = loc;
    document.getElementById('minMax').innerHTML = min + '&deg; - ' + max + '&deg;';
    // document.getElementById('icon').src = "http://openweathermap.org/img/w/" + icon + ".png";
}

function success(pos) {
    weatherBallon(pos.coords.latitude, pos.coords.longitude);
}

function error(err) {
    weatherBallonWithZip(51503);
}

window.onload = function () {

    console.log();
    if (navigator.geolocation) {

        navigator.geolocation.getCurrentPosition(success, error);

    }

}