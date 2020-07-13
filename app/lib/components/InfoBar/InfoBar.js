import React from 'react';
import "./InfoBar.scss";

import closeImage from './../../icons/closeIcon.png';
import onlineIcon from './../../icons/onlineIcon.png';

const InfoBar = ({room}) => (
    <div className='infoBar'>
        <div className='leftInnerContainer'>
            <img className='onlineIcon' src={onlineIcon} alt='Online' />
            <h3>{room}</h3>
        </div>
        <div className='rightInnerContainer'>
            <a href='/' className='leave'>
                <div className='leaveButton'>Leave Chat</div>    
            </a>
        </div>
    </div>
);

export default InfoBar;