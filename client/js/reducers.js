import * as Actions from './actions';
import {combineReducers} from 'redux';
import {truncateHistoryData} from './utils';
import PointAggregation from '../../common/PointAggregation';

const MAX_HISTORY_POINTS = 100;

function temperature(state = {
    current: 0,
    history: [],
    resolution: PointAggregation.MINUTE,
    timeSpan: 60 * 60 * 1000
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
        default:
            return state;
    }
}

export default combineReducers({temperature});