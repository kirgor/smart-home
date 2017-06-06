import React from 'react';
import ReactChart from './ReactChart';
import {formatTemperature, formatTime, truncateHistoryData} from '../utils';
import PointAggregation from '../../../common/PointAggregation';
import '../../css/temperature.less';

const MAX_POINTS = 100;

export default function Temperature({current, history, resolution, timeSpan, onResolutionChange, onTimeSpanChange}) {
    history = truncateHistoryData(history, MAX_POINTS);
    return (
        <div className="temperature">
            <div className="title">
                Current temperature: <span className="current">{formatTemperature(current)}</span>
            </div>
            <div className="chartContainer">
                <ReactChart data={history.map(h => h.value)}
                            labels={history.map(h => formatTime(h.time))}
                            tooltipLabelCallback={item => formatTemperature(item.yLabel)}
                />
            </div>
            <div className="chartParameters">
                <div className="title">Chart parameters</div>
                <div className="resolution">
                    <span className="label">Resolution:</span>
                    <select value={resolution} onChange={e => onResolutionChange(e.target.value)}>
                        <option value={PointAggregation.INSTANT}>Instant</option>
                        <option value={PointAggregation.MINUTE}>Minute</option>
                        <option value={PointAggregation.TEN_MINUTES}>10 minutes</option>
                        <option value={PointAggregation.HOUR}>Hour</option>
                        <option value={PointAggregation.DAY}>Day</option>
                    </select>
                </div>
                <div className="timeSpan">
                    <span className="label">Time span:</span>
                    <select value={timeSpan} onChange={e => onTimeSpanChange(e.target.value)}>
                        <option value={60 * 1000}>1 minute</option>
                        <option value={10 * 60 * 1000}>10 minutes</option>
                        <option value={60 * 60 * 1000}>1 hour</option>
                        <option value={3 * 60 * 60 * 1000}>3 hours</option>
                        <option value={6 * 60 * 60 * 1000}>6 hours</option>
                        <option value={12 * 60 * 60 * 1000}>12 hours</option>
                        <option value={24 * 60 * 60 * 1000}>24 hours</option>
                    </select>
                </div>
            </div>
        </div>
    );
}