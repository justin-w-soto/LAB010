const fetch = require('node-fetch');

// WEATHER

async function getWeather(lat, lon) {
    const apiResp = await fetch(
        `https://api.weatherbit.io/v2.0/forecast/daily?key=${process.env.WEATHER_key}&lat=${lat}&lon=${lon}`
    );
    const apiData = await apiResp.json();
    const data = apiData.data.map((weatherObject) => {
        return {
            forecast: weatherObject.weather.description,
            time: new Date(weatherObject.ts * 1000).toLocaleDateString('en-US', {
                weekday: 'long',
                year: 'numeric', 
                month: 'long',
                day: 'numeric',
            }),

        };
    });
    return data;

}

// YELP

async function getYelp(lat, lon) {
    let URL = `https://api.yelp.com/v3/businesses/search?&latitude=${lat}&longitude=${lon}`;
    let bearer = `Bearer ${process.env.YELP_KEY}`;
    const apiResp = await fetch(URL, {
        method: 'GET',
        withCredentials: true,
        credentials: 'include',
        headers: {
            'Authorization': bearer,
            'Content-Type': 'application/json'
        }
    })
    
    const apiData = await apiResp.json();
    const data = apiData.businesses.map((yelpObject) => {
        return {
            name: yelpObject.name,
            img_url: yelpObject.img_url,
            price: yelpObject.price,
            rating: yelpObject.rating,
            url: yelpObject.url
        };
        
    });
    return data;
}


module.exports = {
    getWeather, getYelp
}