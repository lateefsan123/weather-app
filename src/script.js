import './styles.css';
import page2 from './secondpage';
import thirdone from './thirdpage';



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
const corf = document.querySelectorAll(".corf");
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
const tommorowpic = document.querySelector(".tommorowpic");
const dayafterpic = document.querySelector(".dayafterpic");
const houricons = document.querySelectorAll(".houricons");
const secondpage = document.querySelector(".secondpage");
const firstpage = document.querySelector(".firstpage");
const thirdpage = document.querySelector(".thirdpage");
const circle = document.querySelectorAll(".circle");
const lefty = document.querySelector(".lefty");
const righty = document.querySelector(".righty");
let currenttemp;
let currenttempfeel;
let tommorowdaytemp;
let tommorowdayfeel;
let dayafterdaytemp;
let dayafterdayfeel;
let currentindex = 0;
let holder = [firstpage, secondpage, thirdpage]

export const pics = {
    "Partially cloudy": require('./images/partially_cloudy.png'),
    "Overcast": require("./images/overcast.png"),
    "Clear": require("./images/clear.png"),
    "Rain": require("./images/rain.png"),
    "Rain, Overcast": require("./images/Rain_Overcast.png"),
    "Snow": require("./images/Snow.png")




  };

righty.addEventListener("click", function() {
    if (holder[currentindex] == firstpage) {
        page2();
        currentindex+=1;
    } else if (holder[currentindex] == secondpage) {
        thirdone()
        currentindex+=1;
    } else if (holder[currentindex] == thirdpage) {
        firstone();
        currentindex=0;
    }

})

lefty.addEventListener("click", function() {
    if (holder[currentindex] == firstpage) {
        thirdone();
        currentindex=2;
    } else if (holder[currentindex] == secondpage) {
        firstone()
        currentindex-=1;
    } else if (holder[currentindex] == thirdpage) {
        page2();
        currentindex-=1;
    }

})
secondpage.addEventListener("click", function() {
    page2();
    currentindex=1;
});

firstpage.addEventListener("click", function() {
    firstone();
    currentindex=0;
});

thirdpage.addEventListener("click", function() {
    thirdone();
    currentindex=2;
});

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
    celsius.style.color = "grey";
    farenheit.style.color = "white";
    const bigtemp = Math.round((+(main_temp.textContent) - 32) * 5/9) / 10;
    main_temp.textContent = bigtemp;
    const bigfeel = Math.round((+(currenttempfeel) - 32) * 5/9) / 10;
    feel.textContent = bigfeel;
    const bigtommorowtemp = Math.round((+(tommorowdaytemp) - 32) * 5/9) / 10;
    tommorowtemp.textContent = bigtommorowtemp;
    const bigtommorowdayfeel = Math.round((+(tommorowdaytemp) - 32) * 5/9) / 10;
    tommorowfeel.textContent = bigtommorowdayfeel;
    const bigdayaftertemp = Math.round((+(dayafterdaytemp) - 32) * 5/9) / 10;
    dayaftertemp.textContent = bigdayaftertemp;
    const bigdayafterfeel = Math.round((+(dayafterdayfeel) - 32) * 5/9) / 10;
    dayafterfeel.textContent = bigdayafterfeel;

    corf.forEach(function(element) {
        element.textContent= "°C";
    })
})

function fareinheitchanger() {
    celsius.style.color = "white";
    celsius.classList.add("other")
    
    corf.forEach(function(element) {
        element.textContent= "°F";
    })
    farenheit.style.cursor = "default";
    farenheit.classList.remove("other")
    farenheit.style.color = "grey";
    
    main_temp.textContent = currenttemp;
    feel.textContent = currenttempfeel;
    tommorowtemp.textContent = tommorowdaytemp;
    tommorowfeel.textContent = tommorowdayfeel;
    dayaftertemp.textContent = dayafterdaytemp;
    dayafterfeel.textContent = dayafterdayfeel;
}

farenheit.addEventListener("click", fareinheitchanger);


async function getcountry(country) {
    fareinheitchanger();
    error_message.textContent = "";
    const response = await fetch(`https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${country}?key=BLDHQDCP77YRFBWG8H5LPQ2CC`, {"mode": "cors"})
    const data = await response.json();
    console.log(data)
    corf.forEach(function(element) {
        element.textContent = "°F"
    })
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
    currenttemp = data.currentConditions.temp;
    main_temp.textContent= currenttemp;
    localStorage.setItem("maintemp", data.currentConditions.temp);
    console.log(data.currentConditions.icon);
    if (data.currentConditions.conditions.includes(",")) {
        const first = data.currentConditions.conditions.split(",")[0];
        console.log(first)
        imagine.src = pics[`${first}`];
    } else {
        imagine.src = pics[`${data.currentConditions.conditions}`];
    }
    imagine.style.display = "inline-block";
    console.log(data)

    console.log(data.currentConditions.conditions)
    wind.textContent = `${data.currentConditions.windspeed} kph`;
    currenttempfeel = data.currentConditions.feelslike;
    feel.textContent = `${data.currentConditions.feelslike}`;
    humidity.textContent = `${data.currentConditions.humidity} %`;

    //middle center and middle right
    tommorowday.textContent = tommorow;
    dayafterday.textContent = dayafter;
    tommorowtemp.textContent = `${data.days[1].temp}`;
    tommorowdaytemp = data.days[1].temp;
    dayaftertemp.textContent = `${data.days[2].temp}`;
    dayafterdaytemp = data.days[2].temp;
    tommorowfeel.textContent = `${data.days[1].feelslike}`;
    tommorowdayfeel = data.days[1].feelslike;
    dayafterfeel.textContent = `${data.days[2].feelslike}`;
    dayafterdayfeel = data.days[2].feelslike;
    if (data.days[1].conditions.includes(",")) {
        const topic = data.days[1].conditions.split(",")[0];
        console.log(topic)
        tommorowpic.src = pics[`${topic}`];
    } else {
    tommorowpic.src = pics[`${data.days[1].conditions}`];

    }
    tommorowpic.style.display = "inline-block";
    if (data.days[2].conditions.includes(",")) {
        const daypic = data.days[2].conditions.split(",")[0];
        console.log(daypic);
        dayafterpic.src = pics[`${daypic}`];
    } else {
        dayafterpic.src = pics[`${data.days[2].conditions}`];
    }
    
    dayafterpic.style.display = "inline-block";

    console.log(data.days[1].conditions);
    console.log(data.days[2].conditions);



    firstone();
    




}

async function firstone() {
    document.querySelector(".secondpage").style.backgroundColor = "transparent";
    document.querySelector(".thirdpage").style.backgroundColor = "transparent";
    firstpage.style.backgroundColor = "white";
    const country = document.querySelector("#searchbar");
    

    const response = await fetch(`https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${country.value}?key=BLDHQDCP77YRFBWG8H5LPQ2CC`, {"mode": "cors"})
    const data = await response.json();
    let i=0
    houricons.forEach(function(hour) {
        console.log(data.days[0].hours[i].conditions);

        if (data.days[0].hours[i].conditions.includes(",")) {
            const first = data.days[0].hours[i].conditions.split(",")[0];
            console.log(first)
            hour.src = pics[`${first}`];
        } else {
            hour.src = pics[`${data.days[0].hours[i].conditions}`];
        }
        hour.style.visibility = "visible";
        
        i+=1;

    })
}








search.addEventListener("click", function() {
    if (searchbar.value == "") {
        error_message.textContent = "Must enter an input"
    } else {
        getcountry(searchbar.value);
          
          
    }
})
