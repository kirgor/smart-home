import {connect} from 'react-redux';
import App from './App';
import {setTemperatureResolution, setTemperatureTimeSpan} from '../actions';

const AppContainer = connect(
    state => ({
        temperature: state.temperature
    }),
    dispatch => ({
        onResolutionChange: resolution => {
            dispatch(setTemperatureResolution(resolution))
        },

        onTimeSpanChange: timeSpan => {
            dispatch(setTemperatureTimeSpan(timeSpan))
        }
    })
)(App);

export default AppContainer;

