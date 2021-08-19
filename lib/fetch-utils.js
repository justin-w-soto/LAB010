const fetch = require('node-fetch');

async function getWeather(lat, lon) {
    const apiResp = await fetch(
        `HTTPS: https://api.weatherbit.io/v2.0/forecast/daily?key=${process.env.WEATHER_key}&lat=${lat}&lon=${lon}`
    );
    const apiData = await apiResp.json();
    const data = apiData.data.map((weatherObject) => {
        return {
            forecast: weatherObject.weatherObject.description,
            time: new Date(weatherObject.ts * 1000).toLocaleDateString('en-US', {
                weekday: 'long',
                year: 'numeric', 
                month: 'long',
                day: 'numeric'
            }),

        };
    });
    return data;

}

module.exports = {
    getWeather
};
