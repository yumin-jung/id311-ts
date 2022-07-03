import React, { useState } from 'react';

const BauIcon = ({ patternNum, rotate, colorNum, nickname, score, message, totScore }) => {
    const rotation = ['', ' r1', ' r2', ' r3'];
    const colors = [' red', ' blue', ' black', ' yellow'];
    let hidden = "";
    let color = '';
    if (colorNum < 4) color = colors[colorNum];
    else nickname = '';

    message = 'Message';
    const [messageOn, setMessage] = useState('');
    const MsgBlockOn = (event) => {
        setMessage(message);
        event.target.addEventListener('mouseleave', MsgBlockOff);
    };
    const MsgBlockOff = (event) => {
        setMessage('');
    };

    switch (patternNum) {
        case 0:
            return (
                <div onClick={MsgBlockOn} className={'bauhausBlock' + (messageOn ? ' msgVisible' : ' msgInvisible') + hidden}>
                    <div className={'bauhaus bauQuarter' + rotation[rotate] + color}></div>
                    <div className={'msgBlock' + (nickname ? '' : ' hide')}>
                        <div>
                            <div className='msgNick'>{nickname}</div>
                            <div className='msgScore'>{score + '/' + totScore}</div>
                        </div>
                        <div>
                            <div className='msgMsg'>{message}</div>
                        </div>
                    </div>
                </div>
            );
        case 1:
            return (
                <div onClick={MsgBlockOn} className={'bauhausBlock' + (messageOn ? ' msgVisible' : ' msgInvisible') + hidden}>
                    <div className={'bauhaus circle' + rotation[rotate] + color}></div>
                    <div className={'msgBlock' + (nickname ? '' : ' hide')}>
                        <div>
                            <div className='msgNick'>{nickname}</div>
                            <div className='msgScore'>{score + '/' + totScore}</div>
                        </div>
                        <div>
                            <div className='msgMsg'>{message}</div>
                        </div>
                    </div>
                </div>
            );
        case 2:
            return (
                <div onClick={MsgBlockOn} className={'bauhausBlock' + (messageOn ? ' msgVisible' : ' msgInvisible') + hidden}>
                    <div className={'bauhaus triangle' + rotation[rotate] + color}></div>
                    <div className={'msgBlock' + (nickname ? '' : ' hide')}>
                        <div>
                            <div className='msgNick'>{nickname}</div>
                            <div className='msgScore'>{score + '/' + totScore}</div>
                        </div>
                        <div>
                            <div className='msgMsg'>{message}</div>
                        </div>
                    </div>
                </div>
            );
        case 3:
            return (
                <div onClick={MsgBlockOn} className={'bauhausBlock' + (messageOn ? ' msgVisible' : ' msgInvisible') + hidden}>
                    <div className={'bauhaus' + rotation[rotate]}>
                        <div className={'bauHalf' + color}></div>
                        <div className={'bauHalf' + color}></div>
                    </div>
                    <div className={'msgBlock' + (nickname ? '' : ' hide')}>
                        <div>
                            <div className='msgNick'>{nickname}</div>
                            <div className='msgScore'>{score + '/' + totScore}</div>
                        </div>
                        <div>
                            <div className='msgMsg'>{message}</div>
                        </div>
                    </div>
                </div>
            );
        case 4:
            return (
                <div onClick={MsgBlockOn} className={'bauhausBlock' + (messageOn ? ' msgVisible' : ' msgInvisible') + hidden}>
                    <div className={'hourglass bauhaus' + rotation[rotate] + color}></div>
                    <div className={'msgBlock' + (nickname ? '' : ' hide')}>
                        <div>
                            <div className='msgNick'>{nickname}</div>
                            <div className='msgScore'>{score + '/' + totScore}</div>
                        </div>
                        <div>
                            <div className='msgMsg'>{message}</div>
                        </div>
                    </div>
                </div>
            );
    }

    return;
}

export default BauIcon