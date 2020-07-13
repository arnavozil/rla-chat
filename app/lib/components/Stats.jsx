import React, { useEffect, useState, useRef } from 'react';
import ReactLoading from 'react-loading';
import { connect } from 'react-redux';

const Chat = ({ notifications }) => {

	const objDiv = useRef(null);

	const uniqifyArray = (arr) => {
		const n = [];
		for(let i = 0; i < arr.length; i++){
			if(!mid[arr[i].id]){
				const map = mid;
				map[arr[i].id] = 1;
				setMid(map);
				n.push(arr[i]);
			}
		}
		return n;
	};

	useEffect(() => {
		objDiv.current.scrollIntoView({behavior: 'smooth'})
		const uniqueNotifications = uniqifyArray(notifications);
		setMessages([...messages, ...uniqueNotifications]);
	}, [notifications])

    const [messages, setMessages] = useState([]);
	const [mid, setMid] = useState({});

    return(
        <div data-component='Chat'>
            {messages.map((n) => {
				if(n.type !== 'error' && n.text){
					return(
						<>
						<div style={n.title==='You' && n.id?{alignSelf: 'flex-end', backgroundColor: '#0f9', textAlign: 'right', color: '#003f99'}:{}} className='message' key={n.id}>
							{n.text}
							<br />
							<div className='sub'>{n.title}</div>
						</div>
						<br />
						</>
					)
				}
			})}
			<div style={{marginTop: '30px'}} ref={objDiv}></div>
        </div>
    )
}

const mapStateToProps = (state) =>
{
	const { notifications } = state;

	return { notifications };
};


export default connect(mapStateToProps)(Chat);