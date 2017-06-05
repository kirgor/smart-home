import store from '../store';
import {setCurrentTemperature, addTemperatureHistory} from '../actions';

let from = new Date().getTime() - 1000 * 60 * 60;
let fetching = false;

function fetchTemperature() {
    if (fetching)
        return;

    fetch('/api/temperature?from=' + from)
        .then(response => response.json())
        .then(json => {
            store.dispatch(setCurrentTemperature(json.current));
            store.dispatch(addTemperatureHistory(json.history));
            from = json.lastUpdate;
            fetching = false;
        })
        .catch(() => {
            fetching = false;
        })
}

export function startTemperatureUpdater() {
    fetchTemperature();
    setInterval(() => fetchTemperature(), 1000);
}