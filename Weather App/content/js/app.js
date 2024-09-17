const $ = document
const searchBar = $.querySelector(".search-box")

window.addEventListener("keydown", (e)=> {
    if(e.key == "Enter"){
        showWeather()
    }
})
const showWeather = () => {
    let cityName = searchBar.value
    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=6c944bb8c03e845c74de2fd567494ec2`)
    .then(res => res.json())
    .then(info =>{
        console.log(info)
        showData(info)
    })
}

function showData (info){
    let city = $.querySelector(".city")
    city.innerHTML = info.name + " " + info.sys.country

    let date = $.querySelector(".date")
    date.innerHTML = showDate()
    
    let temp = $.querySelector(".temp")
    temp.innerHTML = (info.main.temp -272.15).toFixed(0)

    let weather = $.querySelector(".weather")
    weather .innerHTML = info.weather[0].main

    let highLow = $.querySelector(".high-low")
     highLow.innerHTML = `${(info.main.temp_max - 272.15).toFixed(1)}°c / ${(info.main.temp_min - 272.15).toFixed(1)}°c`
}

function showDate() {
    
    let months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    
    let days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

    let fullDate = new Date
    let day = days[fullDate.getDay()]
    let date = fullDate.getDate()
    let month = months[fullDate.getMonth()]
    let year = fullDate.getFullYear()
    return day + " " + date + " " + month + " " + year
}
