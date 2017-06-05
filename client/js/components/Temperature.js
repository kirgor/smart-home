import React from 'react';
import PropTypes from 'prop-types';
import ReactChart from './ReactChart';
import {formatTemperature, formatTime, truncateHistoryData} from '../utils';
import '../../css/temperature.less';

const MAX_POINTS = 20;

export default function Temperature({current, history}) {
    history = truncateHistoryData(history, MAX_POINTS);
    return (
        <div className="temperature">
            <div className="title">
                Current temperature: <span className="current">{formatTemperature(current)}</span>
            </div>
            <div className="chartContainer">
                <ReactChart width={800}
                            height={400}
                            data={history.map(h => h.value)}
                            labels={history.map(h => formatTime(h.time))}
                            tooltipLabelCallback={item => formatTemperature(item.yLabel)}
                />
            </div>
        </div>
    );
}

Temperature.propTypes = {
    current: PropTypes.number.isRequired,
    history: PropTypes.arrayOf(PropTypes.number).isRequired
};