const apiURL = 'https://api.open-meteo.com/v1/forecast?latitude=36.1628&longitude=-85.5016&hourly=temperature_2m,weathercode&temperature_unit=fahrenheit'

const weatherDescriptions = {
    0: 'Clear Sky',
    1: 'Mainly Clear',
    2: 'Partly Cloudy',
    3: 'Overcast',
    45: 'Fog',
    48: 'Depositing Rime Fog',
    51: 'Light Drizzle',
    53: 'Moderate Drizzle',
    55: 'Dense Drizzle',
    56: 'Light Freezing Drizzle',
    57: 'Dense Freezing Drizzle',
    61: 'Light Rain',
    63: 'Moderate Rain',
    65: 'Heavy Rain',
    66: 'Light Freezing Rain',
    67: 'Heavy Freezing Rain',
    71: 'Light Snowfall',
    73: 'Moderate Snowfall',
    75: 'Heavy Snowfall',
    77: 'Snow Grains',
    80: 'Light Rain Showers',
    81: 'Moderate Rain Showers',
    82: 'Violent Rain Showers',
    85: 'Light Snow Showers',
    86: 'Heavy Snow Showers',
    95: 'Thunderstorm',
    96: 'Thunderstorm with Hail',
    99: 'Heavy Thunderstorm with Hail',
}

const weatherIcons = {
    0: 'bi bi-sun',
    1: 'bi bi-cloud-sun',
    2: 'bi bi-cloud-sun',
    3: 'bi bi-cloud',
    45: 'bi bi-cloud-fog',
    48: 'bi bi-cloud-fog',
    51: 'bi bi-cloud-drizzle',
    53: 'bi bi-cloud-drizzle',
    55: 'bi bi-cloud-drizzle',
    56: 'bi bi-cloud-drizzle',
    57: 'bi bi-cloud-drizzle',
    61: 'bi bi-cloud-rain',
    63: 'bi bi-cloud-rain',
    65: 'bi bi-cloud-rain',
    66: 'bi bi-cloud-rain',
    67: 'bi bi-cloud-rain',
    71: 'bi bi-cloud-snow',
    73: 'bi bi-cloud-snow',
    75: 'bi bi-cloud-snow',
    77: 'bi bi-cloud-snow',
    80: 'bi bi-cloud-showers-heavy',
    81: 'bi bi-cloud-showers-heavy',
    82: 'bi bi-cloud-showers-heavy',
    85: 'bi bi-cloud-snow-heavy',
    86: 'bi bi-cloud-snow-heavy',
    95: 'bi bi-cloud-lightning',
    96: 'bi bi-cloud-lightning',
    99: 'bi bi-cloud-lightning',
}

async function getWeatherData() {
    try {
        const objResponse = await fetch(apiURL)

        if (!objResponse.ok) {
            throw new Error(`Error: ${objResponse.status}`)
        }

        const objData = await objResponse.json()
        const hour = new Date().getHours()

        const temp = objData.hourly.temperature_2m[hour]
        const weatherCode = objData.hourly.weathercode[hour]

        document.getElementById('temperature').textContent = `Temp: ${temp}°F`

        const weatherDescription = weatherDescriptions[weatherCode]
        document.getElementById('weather').textContent = `Weather: ${weatherDescription}`

        const tempIcon = document.querySelector('#temperatureIcon')
        const weatherIcon = document.querySelector('#weatherIcon')

        if (temp < 30) {
            tempIcon.className = 'bi bi-thermometer-low text-primary'
        } else if (temp <= 80) {
            tempIcon.className = 'bi bi-thermometer-half text-primary'
        } else {
            tempIcon.className = 'bi bi-thermometer-high text-primary'
        }

        const weatherIconClass = weatherIcons[weatherCode]
        weatherIcon.className = `${weatherIconClass} text-primary`
    } catch (error) {
        console.log('Error:', error)
    }
}

getWeatherData()