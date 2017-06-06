import React from 'react';
import Temperature from './Temperature';
import '../../css/app.less';

export default function App({temperature, onResolutionChange, onTimeSpanChange}) {
    return (
        <div className="app">
            <Temperature current={temperature.current}
                         history={temperature.history}
                         resolution={temperature.resolution}
                         timeSpan={temperature.timeSpan}
                         onResolutionChange={onResolutionChange}
                         onTimeSpanChange={onTimeSpanChange}
            />
        </div>
    );
}