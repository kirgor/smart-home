import * as Actions from './actions';
import {combineReducers} from 'redux';
import {truncateHistoryData} from './utils';

const MAX_HISTORY_POINTS = 100;

function temperature(state = {current: 0, history: []}, action) {
    switch (action.type) {
        case Actions.SET_CURRENT_TEMPERATURE:
            return {...state, current: action.temperature};
        case Actions.ADD_TEMPERATURE_HISTORY:
            if (action.data.length !== 0)
                return {...state, history: truncateHistoryData(state.history.concat(action.data), MAX_HISTORY_POINTS)};
            else
                return state;
        default:
            return state;
    }
}

export default combineReducers({temperature});