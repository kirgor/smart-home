export const SET_CURRENT_TEMPERATURE = 'SET_CURRENT_TEMPERATURE';
export const SET_TEMPERATURE_HISTORY = 'SET_TEMPERATURE_HISTORY';
export const ADD_TEMPERATURE_HISTORY = 'ADD_TEMPERATURE_HISTORY';
export const SET_TEMPERATURE_RESOLUTION = 'SET_TEMPERATURE_RESOLUTION';
export const SET_TEMPERATURE_TIME_SPAN = 'SET_TEMPERATURE_TIME_SPAN';

export function setCurrentTemperature(temperature) {
    return {type: SET_CURRENT_TEMPERATURE, temperature}
}

export function setTemperatureHistory(data) {
    return {type: SET_TEMPERATURE_HISTORY, data}
}

export function addTemperatureHistory(data) {
    return {type: ADD_TEMPERATURE_HISTORY, data}
}

export function setTemperatureResolution(resolution) {
    return {type: SET_TEMPERATURE_RESOLUTION, resolution}
}

export function setTemperatureTimeSpan(timeSpan) {
    return {type: SET_TEMPERATURE_TIME_SPAN, timeSpan}
}