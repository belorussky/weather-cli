import { getKeyValue, TOKEN_DICTIONARY } from './storage.service.js';
import axios from 'axios';


const getWeather = async (lat, lon) => {
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

    console.log(data);
    return data;
};

export { getWeather };
