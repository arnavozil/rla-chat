import React from 'react';

import "./Message.scss";

const Message = ({message, name}) => {
    let isSentByCurrentUser = false;
    let trimmedName = name.trim().toLowerCase();
    
    if(trimmedName === message.user){
        isSentByCurrentUser = true;
    }

    return(
        isSentByCurrentUser
            ?(
                <div className='messageContainer justifyEnd'>
                    <p className='sentText pr-10'>{message.user}</p>
                    <div className='messageBox backgroundBlue'>
                        <p className='messageText colorWhite'>{message.text}</p>
                    </div>
                </div>
            )
            :(
                <div className='messageContainer justifyStart'>
                    <div className='messageBox backgroundLight'>
                        <p className='messageText colorDark'>{message.text}</p>
                    </div>
                    <p className='sentText pl-10'>{message.user}</p>
                </div>
            )
    )
}

export default Message;