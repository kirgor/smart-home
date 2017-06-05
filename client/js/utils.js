import dateFormat from 'dateformat';
import numeral from 'numeral';

export function formatTemperature(temperature) {
    return `${numeral(temperature).format('0.00')} \u2103`
}

export function formatTime(time) {
    return dateFormat(new Date(time), 'HH:MM:ss')
}

export function truncateHistoryData(data, maxLength) {
    return data.length > maxLength ? data.slice(data.length - maxLength) : data;
}

export function arraysAreEqual(a1, a2) {
    if (a1.length !== a2.length)
        return false;
    for (let i = 0; i < a1.length; i++) {
        if (a1[i] !== a2[i])
            return false;
    }
    return true;
}