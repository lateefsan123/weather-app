import { pics } from "./script";


export default async function page2() {
    document.querySelector(".firstpage").style.backgroundColor = "transparent";
    document.querySelector(".thirdpage").style.backgroundColor = "transparent";
    const houricons = document.querySelectorAll(".houricons");
    const secondbutton = document.querySelector(".secondpage");
    secondbutton.style.backgroundColor = "white";
    const country = document.querySelector("#searchbar")
    

    const response = await fetch(`https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${country.value}?key=BLDHQDCP77YRFBWG8H5LPQ2CC`, {"mode": "cors"})
    const data = await response.json();
    let i=8
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


    
    
    

    