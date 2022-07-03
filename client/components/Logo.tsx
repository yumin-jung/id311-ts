import * as React from 'react';

const Logo = ({ size }) => {
    return (
        <div className="logo" style={{ transform: 'scale(' + size + ')' }}>
            <div>
                <div className="bigCir yellow"></div>
                <div></div>
                <div></div>
                <div className="quarter red"></div>
            </div>
            <div style={{ transform: 'rotateZ(90deg)' }}>
                <div className="quarter red r2"></div>
                <div className="quarter red r3"></div>
                <div className="half blue"></div>
            </div>
            <div>
                <div className="smallCir blue"></div>
                <div className="longBox yellow"></div>
            </div>
            <div style={{ transform: 'rotateZ(90deg)' }}>
                <div className="half black"></div>
                <div className="half red r2"></div>
            </div>
        </div>
    );
}

export default Logo