const container = document.querySelector(".container")
const search = document.querySelector(".search-box button")
const weatherBox = document.querySelector(".weather-box")
const weatherDetails = document.querySelector(".weather-details")
const error404 = document.querySelector(".not-found")

search.addEventListener("click", ()=>{

    const APIKey = "61f1aa5132b49c16bc6c970e2471f5fa"
    const city = document.querySelector(".search-box input").value

    if(city.trim()==="")
        return


    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${APIKey}`)
        .then(response=> response.json())
        .then(json=>{
            if(json.cod==="404"){
               container.style.height = "400px"
               weatherBox.style.display = "none"
               weatherDetails.style.display = "none"
               error404.style.display = "block"
               error404.classList.add("fadeIn")
               return
            }
           
            error404.style.display = "none"
            error404.classList.remove("fadeIn")
               
            
            const image = document.querySelector(".weather-box img")
            const temperature = document.querySelector(".weather-box .temperature")
            const description = document.querySelector(".weather-box .description")
            const humidity = document.querySelector(".weather-details .humidity span")
            const wind = document.querySelector(".weather-details .wind span")

            // switch(json.weather[0].main){
            //     case "Clear":
            //         image.src = "images/clear.png"
            //         break
            //     case "Cloud":
            //     case "Partly Cloudy":
            //     case "Mostly Cloudy":
   
            //         image.src = "images/cloud.png"
            //         break
            //     case "Mist":
            //         image.src = "images/mist.png"
            //         break
            //     case "Rain":
            //         image.src = "images/rain.png"
            //          break
            //     case "Snow":
            //         image.src = "images/snow.png"
            //         break
            //     default:
            //         image.src = "";
            // }

            const weatherCondition = json.weather[0].description.toLowerCase(); // Küçük harfe çevir

    if (weatherCondition.includes("cloud")) { 
    // Eğer açıklama bulut içeriyorsa (örn. "Overcast Clouds", "Few Clouds", "Broken Clouds") 
        image.src = "images/cloud.png"; 
    } else { 
    // Diğer tüm hava durumları için özel kontrol
    switch(json.weather[0].main) {
        case "Clear":
            image.src = "images/clear.png";
            break;
        case "Mist":
            image.src = "images/mist.png";
            break;
        case "Rain":
            image.src = "images/rain.png";
            break;
        case "Snow":
            image.src = "images/snow.png";
            break;
        default:
            image.src = "";
    }
}

            temperature.innerHTML = `${parseInt(json.main.temp)}<span>°C</span>`
            description.innerHTML = `${json.weather[0].description}`
            humidity.innerHTML = `${json.main.humidity}%`
            wind.innerHTML = `${parseInt(json.wind.speed)}Km/h`

            weatherBox.style.display = ""
            weatherDetails.style.display = ""
            weatherBox.classList.add("fadeIn")
            weatherDetails.classList.add("fadeIn")
            container.style.height = "590px"
        })

        
})