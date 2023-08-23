#!/usr/bin/env node
import { getArgs } from './helpers/args.js'
import { getWeather, getIcon } from './services/api.service.js';
import { printHelp, printSuccess, printError, printWeather } from './services/log.service.js';
import { saveKeyValue, getKeyValue, TOKEN_DICTIONARY } from './services/storage.service.js';

const saveToken = async (token) => {
    if (!token.length) {
        printError('The token is not defined');
        return;
    }
    try {
        await saveKeyValue(TOKEN_DICTIONARY.token, token);
        printSuccess('Token is saved');
    } catch (e) {
        printError(e.message);
    }
}

const saveCity = async (city) => {
    if (!city.length) {
        printError('The city is not defined');
        return;
    }
    try {
        await saveKeyValue(TOKEN_DICTIONARY.city, city);
        printSuccess('City is saved');
    } catch (e) {
        printError(e.message);
    }
}

const getForcast = async () => {
    try {
        const city = process.env.CITY ?? await getKeyValue(TOKEN_DICTIONARY.city);
        const weather = await getWeather(city);
        printWeather(weather, getIcon(weather.weather[0].icon));
    } catch (e) {
        if (e?.response?.status == 404) {
            printError('The city is specified incorrectly');
        } else if (e?.response?.status == 401) {
            printError('The token is specified incorrectly');
        } else {
            printError(e.message);
        }
    }
};

const initCLI = () => {
    const args = getArgs(process.argv);
    if (args.h) {
        return printHelp();
    }
    if (args.s) {
        return saveCity(args.s);
    }
    if (args.t) {
        return saveToken(args.t);
    }
    return getForcast();
};

initCLI();
