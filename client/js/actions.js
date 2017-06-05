export const SET_CURRENT_TEMPERATURE = 'SET_CURRENT_TEMPERATURE';
export const ADD_TEMPERATURE_HISTORY = 'ADD_TEMPERATURE_HISTORY';

export function setCurrentTemperature(temperature) {
    return {type: SET_CURRENT_TEMPERATURE, temperature}
}

export function addTemperatureHistory(data) {
    return {type: ADD_TEMPERATURE_HISTORY, data}
}