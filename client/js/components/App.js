import React from 'react';
import Temperature from './Temperature';
import LoadingMoire from './LoadingMoire';
import '../../css/app.less';

export default function App({temperature, onResolutionChange, onTimeSpanChange}) {
    return (
        <div className="app">
            <LoadingMoire visible={temperature.loading}>
                <Temperature current={temperature.current}
                             history={temperature.history}
                             resolution={temperature.resolution}
                             timeSpan={temperature.timeSpan}
                             onResolutionChange={onResolutionChange}
                             onTimeSpanChange={onTimeSpanChange}
                />
            </LoadingMoire>
        </div>
    );
}