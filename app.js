const apiURL = 'https://api.open-meteo.com/v1/forecast?latitude=36.1628&longitude=-85.5016&hourly=temperature_2m,weathercode&temperature_unit=fahrenheit'

const weatherData = {
    0: { description: 'Clear Sky', icon: 'bi bi-sun' },
    1: { description: 'Mainly Clear', icon: 'bi bi-cloud-sun' },
    2: { description: 'Partly Cloudy', icon: 'bi bi-cloud-sun' },
    3: { description: 'Overcast', icon: 'bi bi-cloud' },
    45: { description: 'Fog', icon: 'bi bi-cloud-fog' },
    48: { description: 'Depositing Rime Fog', icon: 'bi bi-cloud-fog' },
    51: { description: 'Light Drizzle', icon: 'bi bi-cloud-drizzle' },
    53: { description: 'Moderate Drizzle', icon: 'bi bi-cloud-drizzle' },
    55: { description: 'Dense Drizzle', icon: 'bi bi-cloud-drizzle' },
    56: { description: 'Light Freezing Drizzle', icon: 'bi bi-cloud-drizzle' },
    57: { description: 'Dense Freezing Drizzle', icon: 'bi bi-cloud-drizzle' },
    61: { description: 'Light Rain', icon: 'bi bi-cloud-rain' },
    63: { description: 'Moderate Rain', icon: 'bi bi-cloud-rain' },
    65: { description: 'Heavy Rain', icon: 'bi bi-cloud-rain' },
    66: { description: 'Light Freezing Rain', icon: 'bi bi-cloud-rain' },
    67: { description: 'Heavy Freezing Rain', icon: 'bi bi-cloud-rain' },
    71: { description: 'Light Snowfall', icon: 'bi bi-cloud-snow' },
    73: { description: 'Moderate Snowfall', icon: 'bi bi-cloud-snow' },
    75: { description: 'Heavy Snowfall', icon: 'bi bi-cloud-snow' },
    77: { description: 'Snow Grains', icon: 'bi bi-cloud-snow' },
    80: { description: 'Light Rain Showers', icon: 'bi bi-cloud-showers-heavy' },
    81: { description: 'Moderate Rain Showers', icon: 'bi bi-cloud-showers-heavy' },
    82: { description: 'Violent Rain Showers', icon: 'bi bi-cloud-showers-heavy' },
    85: { description: 'Light Snow Showers', icon: 'bi bi-cloud-snow-heavy' },
    86: { description: 'Heavy Snow Showers', icon: 'bi bi-cloud-snow-heavy' },
    95: { description: 'Thunderstorm', icon: 'bi bi-cloud-lightning' },
    96: { description: 'Thunderstorm with Hail', icon: 'bi bi-cloud-lightning' },
    99: { description: 'Heavy Thunderstorm with Hail', icon: 'bi bi-cloud-lightning' },
}

async function getWeatherData() {
    try {
        const objResponse = await fetch(apiURL)

        if (!objResponse.ok) {
            throw new Error('Error: ' + objResponse.status)
        }

        const objData = await objResponse.json()
        const hour = new Date().getHours()

        const temp = objData.hourly.temperature_2m[hour]
        const weatherCode = objData.hourly.weathercode[hour]

        const description = weatherData[weatherCode]?.description || 'Unknown'
        const iconClass = weatherData[weatherCode]?.icon || ''

        document.getElementById('temperature').textContent = 'Temp: ' + temp + '°'
        document.getElementById('precipitation').textContent = 'Weather: ' + description

        document.querySelector('#temperatureIcon').className = 
            temp < 30 ? 'bi bi-thermometer-low text-primary' :
            temp <= 80 ? 'bi bi-thermometer-half text-primary' :
            'bi bi-thermometer-high text-primary'

        if (iconClass) {
            document.querySelector('#precipitationIcon').className = iconClass + ' text-primary'
        }
    } catch (error) {
        console.log('Error:', error)
    }
}

getWeatherData()