import * as Actions from './actions';
import {combineReducers} from 'redux';
import {truncateHistoryData} from './utils';
import TimeSpan from './TimeSpan';

const MAX_HISTORY_POINTS = 100;

function temperature(state = {
    loading: false,
    current: 0,
    history: [],
    resolution: -1,
    timeSpan: TimeSpan.DAY
}, action) {
    switch (action.type) {
        case Actions.SET_CURRENT_TEMPERATURE:
            return {...state, current: action.temperature};
        case Actions.ADD_TEMPERATURE_HISTORY:
            if (action.data.length !== 0)
                return {...state, history: truncateHistoryData(state.history.concat(action.data), MAX_HISTORY_POINTS)};
            else
                return state;
        case Actions.SET_TEMPERATURE_HISTORY:
            return {...state, history: action.data};
        case Actions.SET_TEMPERATURE_RESOLUTION:
            return {...state, resolution: action.resolution};
        case Actions.SET_TEMPERATURE_TIME_SPAN:
            return {...state, timeSpan: action.timeSpan};
        case Actions.START_LOADING_TEMPERATURE:
            return {...state, loading: true};
        case Actions.STOP_LOADING_TEMPERATURE:
            return {...state, loading: false};
        default:
            return state;
    }
}

export default combineReducers({temperature});