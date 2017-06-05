import React from 'react';
import Temperature from './Temperature';
import '../../css/app.less';

export default function App({temperature}) {
    return (
        <div className="app">
            <Temperature current={temperature.current} history={temperature.history}/>
        </div>
    );
}