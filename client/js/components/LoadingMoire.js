import React from 'react';
import '../../css/loadingMoire.less';

export default function LoadingMoire({children, visible}) {
    return (
        <div className={`loadingMoire ${visible ? 'visible' : 'hidden'}`}>
            <div className="content">{children}</div>
            <div className="moire"/>
            <div className="dots">
                <div className="dot first"/>
                <div className="dot second"/>
                <div className="dot third"/>
            </div>
        </div>
    )
}