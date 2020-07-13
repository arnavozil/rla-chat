import React, { useEffect, useState } from 'react';
import ReactLoading from 'react-loading';

const Chat = ({ location }) => {

    const [name, setName] = useState('');
    const [room, setRoom] = useState('');
    const [message, setMessage] = useState('');
    const [messages, setMessages] = useState([]);

    return(
        <div data-component='Chat'>
            <div className='container'>
                dsds
            </div>
        </div>
    )
}

export default Chat;