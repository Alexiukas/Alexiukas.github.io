// Constants

const api = {
    key: "09cf58dd5af30fecf5f5983b2c69a1c0",
    base: "api.openweathermap.org/data/2.5/weather?"
}

const weather = {}
const cordinates ={}

const hourlyContainer = document.querySelector('.weather-hourly-container');
const forecastContainer = document.querySelector('.weather-current-container');
const forecastList = document.querySelector('.weather-info-list');
const weatherContainer = document.querySelector('.weather-info-container');

const currentButton = document.querySelector(".current-button");
currentButton.addEventListener('click', setCurrentForecast);

const daysButton = document.querySelector(".days-button");
daysButton.addEventListener('click', setDaysForecast);

const hoursButton = document.querySelector(".hours-button");
hoursButton.addEventListener('click', setHoursForecast);

window.addEventListener('load',()=>{
if(navigator.geolocation){
    navigator.geolocation.getCurrentPosition(position =>{
        cordinates.long = position.coords.longitude;
        cordinates.lat = position.coords.latitude;
    })
}
})

// Functions
// Current forecast fetch function

function setCurrentForecast(evt){
    evt.preventDefault();
    var containerRemove = document.querySelector(".hourly-forecast-list");
    if(containerRemove){
        containerRemove.remove();
    }

    
    
    let sendAPI = `http://api.openweathermap.org/data/2.5/weather?lat=${cordinates.lat}&lon=${cordinates.long}&units=metric&appid=${api.key}`

    fetch(sendAPI)
        .then(function (response){
            let data = response.json();
            return data;
        })
        .then(function(data){
            weather.city = data.name;
            weather.forecast = data.main.temp;
            weather.description = data.weather[0].description;
            weather.icon = data.weather[0].icon
            
        })
        .then(function(){
           createCurrentForecast();
           
            
        })
}

// 24hours forecast function

function setHoursForecast(evt){
    evt.preventDefault();
    var isElement = document.getElementById('test');
    if(isElement){
        isElement.remove();
    }

    var l = document.getElementById("weather-info-city");
    var m = document.getElementById("weather-info-forecast");
    var n = document.getElementById("weather-info-description");
    var o = document.getElementById("weather-info-icon");
    if(l){
        l.remove();
        m.remove();
        n.remove();
        o.remove();
    }
   
    let sendAPI =  `http://api.openweathermap.org/data/2.5/onecall?lat=${cordinates.lat}&lon=${cordinates.long}&units=metric&appid=${api.key}`

    fetch(sendAPI)
        .then(response =>{
            let data = response.json();
            return data;
        })
        .then(data =>{
            weather.hourly = data.hourly;
        })
        .then(x=>{
            var l = document.getElementById("weather-info-city")
            var m = document.getElementById("weather-info-forecast")
            var n = document.getElementById("weather-info-description")

            
            var date = new Date();
            var time = date.getHours();

            const listHourly = document.createElement('ul')
            listHourly.classList.add('hourly-forecast-list');
            listHourly.setAttribute('id','test');

            for(i=0;i<24;i++){
                hoursList(i,time, listHourly);
            }
        })
}

function setDaysForecast(evt){
    evt.preventDefault();

}
//Creates hours list elements

function hoursList (index, time, list) {
    var totalTime = index + time;

    
    
    const listItem = document.createElement('li');
    listItem.classList.add('owwowo');
    if(totalTime > 24){
        totalTime = totalTime -24
    }
    if( index == 0){
        listItem.innerText = "Right now it is " + weather.hourly[index].temp;
    }else{
        listItem.innerText = "At " + `${totalTime}` + ":00 will be " + weather.hourly[index].temp;
    }

    list.appendChild(listItem);
    hourlyContainer.appendChild(list);
     
}

// creates current forecast elements

function createCurrentForecast(){
    const divCity = document.createElement('div');
    divCity.setAttribute('id','weather-info-city');
    const divForecast = document.createElement('div');
    divForecast.setAttribute('id','weather-info-forecast')
    const divDiscription = document.createElement('div');
    divDiscription.setAttribute('id','weather-info-description');
    const divIcon = document.createElement('img');
    divIcon.setAttribute('id','weather-info-icon');
    divIcon.classList.add("weather-info-icon");

    forecastContainer.appendChild(divCity);
    forecastContainer.appendChild(divForecast);
    forecastContainer.appendChild(divDiscription);
    forecastContainer.appendChild(divIcon);

    document.getElementById("weather-info-city").innerHTML = weather.city;
    document.getElementById("weather-info-forecast").innerHTML = weather.forecast + " C°";
    document.getElementById("weather-info-description").innerHTML = weather.description;
    document.getElementById("weather-info-icon").src = new URL(`http://openweathermap.org/img/wn/${weather.icon}@2x.png`);


}
