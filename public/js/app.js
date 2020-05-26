const city = document.querySelector('input')
const searchForm = document.querySelector('form')
const cityName = document.querySelector('#cityName')
const resultsInstantForecast = document.querySelector('#resultsInstantForecast')
const instantMeteo = document.querySelector('.instantMeteo')

//Table for hourly forecast results
const hourlyForecastTitles = document.querySelector("#hourlyForecastTitles")
const hourlyForecastResults = document.querySelector("#hourlyForecastResults")

//Table for daily forecast results
const dailyForecastTitles = document.querySelector("#dailyForecastTitles")
const dailyForecastResults = document.querySelector("#dailyForecastResults")

searchForm.addEventListener('submit',(e)=>{
    e.preventDefault();

    cityName.innerText = "Loading in progress"

    fetch('https://codingstuff-weather-app-nodejs.herokuapp.com/weather?address='+ city.value).then((response) => {
        response.json().then((data) => {

            if (data.error) {
                console.log(data.error)
                cityName.innerText = "Cette ville n\'est pas valide"
            } else {
                cityName.innerText = data.location

                const instantMeteoTime = new Date(data.forecast.currently.time).getHours()+ ":" + new Date(data.forecast.currently.time).getMinutes()
                instantMeteo.innerHTML = "<ul><li>Météo prise à " + instantMeteoTime + "</li><li>Climat actuel : " +data.forecast.currently.summary+"</li><li>Temperature : "+ data.forecast.currently.temperature + " °C</li></ul>"

                // loop for hourly forecast informations
                for (let i = 0; i < 6; i++) {
                    var day = new Date(data.forecast.hourly.data[i].time).getDay()
                    var month = new Date(data.forecast.hourly.data[i].time).getMonth()

                    // Create dynamic table headers
                    var th = document.createElement("th")
                    var title = document.createTextNode(day+"/"+month)
                    th.appendChild(title)
                    hourlyForecastTitles.appendChild(th)

                    // Fill the cells of the table
                    var td = document.createElement("td")
                    var cell = document.createTextNode(data.forecast.hourly.data[i].summary)
                    td.appendChild(cell)
                    hourlyForecastResults.appendChild(td)
                }

                // loop for daily forecast informations
                for (let j = 0; j < 4; j++) {
                    var day = new Date(data.forecast.daily.data[j].time).getDay()
                    var month = new Date(data.forecast.daily.data[j].time).getMonth()

                    // Create dynamic table headers
                    var th = document.createElement("th")
                    var title = document.createTextNode(day+"/"+month)
                    th.appendChild(title)
                    dailyForecastTitles.appendChild(th)

                    // Fill the cells of the table
                    var td = document.createElement("td")
                    var cell = document.createTextNode(data.forecast.daily.data[j].summary)
                    td.appendChild(cell)
                    dailyForecastResults.appendChild(td)
                }
            }
        })
    })
})