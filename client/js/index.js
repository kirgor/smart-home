import React from 'react';
import {render} from 'react-dom';
import {Provider} from 'react-redux';
import store from './store';
import AppContainer from './components/AppContainer';
import {startTemperatureUpdater} from './updaters/temperatureUpdater';

render(
    <Provider store={store}>
        <AppContainer/>
    </Provider>,
    document.getElementById('app')
);

startTemperatureUpdater();