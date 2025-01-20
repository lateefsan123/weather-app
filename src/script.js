import './styles.css';




const search = document.querySelector(".search");
const error_message = document.querySelector(".error-message");
const searchbar = document.querySelector("#searchbar");
const location = document.querySelector(".location");
const weather = document.querySelector(".weather");
const date = document.querySelector(".date");
const time = document.querySelector(".time");
const main_temp = document.querySelector(".main-temp");
const celsius = document.querySelector(".celsius");
const farenheit = document.querySelector(".farenheit");
const corf = document.querySelector(".corf");
const iconis = document.querySelector(".icon");
const wind = document.querySelector(".wind");
const feel = document.querySelector(".feel");
const humidity = document.querySelector(".humidity");
const rain = document.querySelector(".rain");
const tommorowday = document.querySelector(".tommorowday");
const dayafterday = document.querySelector(".dayafterday");
const tommorowtemp = document.querySelector(".tommorowtemp");
const dayaftertemp = document.querySelector(".dayaftertemp");
const tommorowfeel = document.querySelector(".tommorowfeel");
const dayafterfeel = document.querySelector(".dayafterfeel");
const imagine = document.querySelector(".imagine");

const pics = {
    "partially cloudy": "\images\partially_cloudy.png"
}

const today = new Date();
const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];
const current = today.getDay();

const tommorow = days[current+1];
const dayafter = days[current+2];
console.log(tommorow, dayafter)

function runlocal() {
    location.textContent = localStorage.resolvedAddress;
    weather.textContent = localStorage.conditions;
    date.textContent = localStorage.date;
    time.textContent = localStorage.time;
    main_temp.textContent = localStorage.maintemp;
}
 runlocal();

celsius.addEventListener("click", function() {
    farenheit.classList.add("other")
    corf.textContent= "°C";
    celsius.style.cursor = "default";
    celsius.classList.remove("other")
})

farenheit.addEventListener("click", function() {
    celsius.classList.add("other")
    corf.textContent= "°F";
    farenheit.style.cursor = "default";
    farenheit.classList.remove("other")
})

async function getcountry(country) {
    error_message.textContent = "";
    const response = await fetch(`https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${country}?key=BLDHQDCP77YRFBWG8H5LPQ2CC`, {"mode": "cors"})
    const data = await response.json();
    console.log(data)
    location.textContent = data.resolvedAddress;
    localStorage.setItem("resolvedAddress", data.resolvedAddress);
    weather.textContent = data.currentConditions.conditions;
    localStorage.setItem("conditions", data.currentConditions.conditions);
    const currentdate = new Date();
    const formatdate = currentdate.toISOString().split('T')[0];
    date.textContent = formatdate;
    localStorage.setItem("date", formatdate);
    time.textContent = data.currentConditions.datetime;
    localStorage.setItem("time", data.currentConditions.datetime);
    main_temp.textContent= data.currentConditions.temp;
    localStorage.setItem("maintemp", data.currentConditions.temp);
    console.log(data.currentConditions.icon);
    wind.textContent = `${data.currentConditions.windspeed} kph`;
    feel.textContent = `${data.currentConditions.feelslike} °C`;
    humidity.textContent = `${data.currentConditions.humidity} %`;

    //middle center and middle right
    tommorowday.textContent = tommorow;
    dayafterday.textContent = dayafter;
    tommorowtemp.textContent = `${data.days[1].temp} °C`;
    dayaftertemp.textContent = `${data.days[2].temp} °C`;
    tommorowfeel.textContent = `${data.days[1].feelslike} °C`;
    dayafterfeel.textContent = `${data.days[2].feelslike} °C`;




}









search.addEventListener("click", function() {
    if (searchbar.value == "") {
        error_message.textContent = "Must enter an input"
    } else {
        getcountry(searchbar.value);
          
          
    }
})
