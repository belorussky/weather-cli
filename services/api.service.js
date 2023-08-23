import { getKeyValue, TOKEN_DICTIONARY } from './storage.service.js';
import axios from 'axios';

const getIcon = (icon) => {
    switch (icon.slice(0, -1)) {
		case '01':
			return '☀️';
		case '02':
			return '🌤️';
		case '03':
			return '☁️';
		case '04':
			return '☁️';
		case '09':
			return '🌧️';
		case '10':
			return '🌦️';
		case '11':
			return '🌩️';
		case '13':
			return '❄️';
		case '50':
			return '🌫️';
	}
};

const getWeatherByCoordinates = async (lat, lon) => {
    const token = process.env.TOKEN ?? await getKeyValue(TOKEN_DICTIONARY.token);
    
    if (!token) {
        throw new Error('API key not specified, set it via the command -t [API_KEY]');
    }

    const { data } = await axios.get('https://api.openweathermap.org/data/2.5/weather', {
        params: {
            lat: lat,
            lon: lon,
            appid: token,
            lang: 'en',
            units: 'metric'
        }
    });

    return data;
};

const getWeather = async (city) => {
    const token = process.env.TOKEN ?? await getKeyValue(TOKEN_DICTIONARY.token);
    
    if (!token) {
        throw new Error('API key not specified, set it via the command -t [API_KEY]');
    }

    const { data } = await axios.get('https://api.openweathermap.org/geo/1.0/direct', {
        params: {
            q: city,
            appid: token
        }
    })
    
    return await getWeatherByCoordinates(data[0].lat,data[0].lon);

};

export { getWeather, getIcon };
