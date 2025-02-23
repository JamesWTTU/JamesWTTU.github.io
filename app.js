const strAPIURL = 'https://api.open-meteo.com/v1/forecast?latitude=36.1682&longitude=-85.5016&hourly=temperature_2m,relative_humidity_2m,precipitation&temperature_unit=fahrenheit&wind_speed_unit=mph&precipitation_unit=inch&timezone=auto&forecast_days=1'

async function fetchWeatherData() {
    try {
        const objResponse = await fetch(strAPIURL)

        if (!objResponse.ok) {
            throw new Error(`HTTP Error Status: ${objResponse.status}`)
        }

        const objData = await objResponse.json()
        const currentTime = new Date()
        const hour = currentTime.getHours()

        const temperature = objData.hourly.temperature_2m[hour]
        const humidity = objData.hourly.relative_humidity_2m[hour]
        const precipitation = objData.hourly.precipitation[hour]

        updateWeatherDisplay(temperature, humidity, precipitation)
        updateWeatherIcons(temperature, humidity, precipitation)
    } catch (objError) {
        console.log('Error fetching objData:', objError)
    }
}

function updateWeatherDisplay(temperature, humidity, precipitation) {
    document.getElementById('temperature').textContent = `Temperature: ${temperature}°F`
    document.getElementById('humidity').textContent = `Humidity: ${humidity}%`
    document.getElementById('precipitation').textContent = `Precipitation: ${precipitation} inches`
}

function updateWeatherIcons(temperature, humidity, precipitation) {
    const temperatureIcon = document.querySelector('#temperatureIcon')
    const humidityIcon = document.querySelector('#humidityIcon')
    const precipitationIcon = document.querySelector('#precipitationIcon')

    if (temperature < 30) {
        temperatureIcon.className = 'bi bi-thermometer-low'
        temperatureIcon.style.color = 'lightblue'
    } else if (temperature >= 30 && temperature <= 80) {
        temperatureIcon.className = 'bi bi-thermometer-half'
        temperatureIcon.style.color = 'orange'
    } else {
        temperatureIcon.className = 'bi bi-thermometer-high'
        temperatureIcon.style.color = 'red'
    }

    if (humidity >= 75) {
        humidityIcon.className = 'bi bi-droplet-fill'
        humidityIcon.style.color = 'blue'
    } else if (humidity <= 50){
        humidityIcon.className = 'bi bi-droplet-half'
        humidityIcon.style.color = 'blue'
    } else if (humidity = 0){
        humidityIcon.className = 'bi bi-droplet'
        humidityIcon.style.color = 'blue'
    }

    if (precipitation > 0) {
        if (precipitation <= 0.02) {
            precipitationIcon.className = 'bi bi-cloud-drizzle'
            precipitationIcon.style.color = 'cyan'
        } else if (precipitation <= 0.30) {
            precipitationIcon.className = 'bi bi-cloud-rain'
            precipitationIcon.style.color = 'cyan'
        } else {
            precipitationIcon.className = 'bi bi-cloud-rain-heavy'
            precipitationIcon.style.color = 'cyan'
        }
    } else {
        precipitationIcon.className = 'bi bi-cloud-sun'
        precipitationIcon.style.color = 'yellow'
    }
}

document.addEventListener('DOMContentLoaded', function() {
    fetchWeatherData()
})