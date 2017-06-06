import store from './store';
import {setCurrentTemperature, setTemperatureHistory} from './actions';

export default class TemperatureFetcher {
    constructor(resolution) {
        this.resolution = resolution;
    }

    startUpdatingCurrent(timeSpan) {
        this.stopUpdatingCurrent();

        const update = async () => {
            const now = new Date().getTime();
            const json = await this.fetch(now - timeSpan, now);
            if (json.length > 0) {
                store.dispatch(setCurrentTemperature(json[json.length - 1].value));
                store.dispatch(setTemperatureHistory(json));
            }
        };

        update();
        this.interval = setInterval(update, 60000);
    }

    stopUpdatingCurrent() {
        clearInterval(this.interval);
    }

    async fetch(from, to) {
        if (this.fetching)
            return;

        try {
            this.fetching = true;
            const response = await fetch(`/api/temperature?from=${from}&to=${to}&resolution=${this.resolution}`);
            return response.json();
        } finally {
            this.fetching = false;
        }
    }
}