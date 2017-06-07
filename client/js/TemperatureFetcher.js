import store from './store';
import {setCurrentTemperature, setTemperatureHistory} from './actions';
import PointAggregation from '../../common/PointAggregation';
import TimeSpan from './TimeSpan';

const autoResolutions = {
    [TimeSpan.MINUTE]: PointAggregation.SECOND,
    [TimeSpan.TEN_MINUTES]: PointAggregation.MINUTE,
    [TimeSpan.HOUR]: PointAggregation.MINUTE,
    [TimeSpan.THREE_HOURS]: PointAggregation.TEN_MINUTES,
    [TimeSpan.SIX_HOURS]: PointAggregation.TEN_MINUTES,
    [TimeSpan.TWELVE_HOURS]: PointAggregation.HOUR,
    [TimeSpan.DAY]: PointAggregation.HOUR,
};

export default class TemperatureFetcher {
    constructor(resolution) {
        this.resolution = resolution;
    }

    startUpdatingCurrent(timeSpan) {
        this.timeSpan = timeSpan;
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
            const resolution = this.resolution > 0 ? this.resolution : autoResolutions[this.timeSpan];
            const response = await fetch(`/api/temperature?from=${from}&to=${to}&resolution=${resolution}`);
            return response.json();
        } finally {
            this.fetching = false;
        }
    }
}