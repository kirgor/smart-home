import React from 'react';
import {render} from 'react-dom';
import {Provider} from 'react-redux';
import store from './store';
import AppContainer from './components/AppContainer';
import TemperatureFetcher from './TemperatureFetcher';

let temperatureFetcher;
let resolution = store.getState().temperature.resolution;
let timeSpan = store.getState().temperature.timeSpan;
function updateFetcher() {
    if (temperatureFetcher)
        temperatureFetcher.stopUpdatingCurrent();
    temperatureFetcher = new TemperatureFetcher(resolution);
    temperatureFetcher.startUpdatingCurrent(timeSpan);
}
store.subscribe(() => {
    if (resolution !== store.getState().temperature.resolution || timeSpan !== store.getState().temperature.timeSpan) {
        resolution = store.getState().temperature.resolution;
        timeSpan = store.getState().temperature.timeSpan;
        updateFetcher();
    }
});
updateFetcher();

render(
    <Provider store={store}>
        <AppContainer/>
    </Provider>,
    document.getElementById('app')
);