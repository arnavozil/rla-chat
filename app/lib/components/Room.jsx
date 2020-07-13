import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import ReactTooltip from 'react-tooltip';
import classnames from 'classnames';
import clipboardCopy from 'clipboard-copy';
import * as appPropTypes from './appPropTypes';
import { withRoomContext } from '../RoomContext';
import * as requestActions from '../redux/requestActions';
import { Appear } from './transitions';
import Me from './Me';
import ChatInput from './ChatInput';
import Peers from './Peers';
import Notifications from './Notifications';
import Stats from './Stats';
import { FaVideo, FaVideoSlash, FaMicrophone, FaMicrophoneSlash, FaInbox } from 'react-icons/fa';
import NetworkThrottle from './NetworkThrottle';
import { IoIosRefreshCircle } from 'react-icons/io';
import { MdWallpaper } from 'react-icons/md';
import { FcLock, FcUnlock } from 'react-icons/fc';

const mapWall = ['alchemy.gif', 'brijan.gif', 'asteroids.jpg', 'cuadros.png', 'dark-wood.jpg', 'kale-salad.jpg', 'hodgepodge.png', 'science.png', 'plaid.jpg'];
const mapHead = ['#f8961e', '#d90429', '#8dcaff', '#e63946', '#333533', '#2d6a4f', '#240046', '#90be6d', '#112'];
const mapHeadText = ['#1b4332', '#b7e4c7', '#000', '#caffbf', '#edf2f4', '#f5cb5c', '#c6def1', '#283d3b', '#fff'];

class Room extends React.Component
{
	constructor(props){
		super(props);
		this.state = {
			checked: false,
			wall: 2,
			showGradient: false,
			lockScreen: false
		};
	}

	render()
	{
		const {
			roomClient,
			room,
			me,
			amActiveSpeaker,
			onRoomLinkCopy
		}	= this.props;


		return (
			<Appear duration={300}>
				<div style={{background: `url('./../../resources/images/${mapWall[this.state.wall]}')`}} data-component='Room'>
					<section ref={i=>this.notRef=i}>
						<Notifications />
					</section>
					<div onClick={()=>this.setState(p=>({lockScreen:!p.lockScreen}))} className='locker'>
						{this.state.lockScreen?<FcUnlock className='icon' />:<FcLock className='icon' />}
					</div>
					<div ref={i=>this.linkRef=i} className='room-link-wrapper'>
						<div style={{backgroundColor: mapHeadText[this.state.wall]}} className='room-link'>
							<a
								className='link'
								href={room.url}
								style={{color: mapHead[this.state.wall]}}
								target='_blank'
								rel='noopener noreferrer'
								onClick={(event) =>
								{
									// If this is a 'Open in new window/tab' don't prevent
									// click default action.
									if (
										event.ctrlKey || event.shiftKey || event.metaKey ||
										// Middle click (IE > 9 and everyone else).
										(event.button && event.button === 1)
									)
									{
										return;
									}

									event.preventDefault();

									const urlParams = new URLSearchParams(room.url);
									const myParam = urlParams.get('roomId');
									clipboardCopy(myParam)
										.then(onRoomLinkCopy);
								}}
							>
								Copy Class Code
							</a>
						</div>
					</div>

					<Peers lockScreen={this.state.lockScreen} backColor={[mapHead[this.state.wall]]} />

					<div
						className={classnames('me-container', {
							'active-speaker' : amActiveSpeaker
						})}
						ref={i=>this.meRef=i}
					>
						<Me backColor={mapHead[this.state.wall]} />
					</div>

					<header ref={i=>this.headRef=i} style={{backgroundColor: mapHead[this.state.wall]}} className='header'>
						<div style={{backgroundColor: mapHeadText[this.state.wall]}} className='box'>
							<FaInbox className='icon' color={mapHead[this.state.wall]} />
							<input checked={this.state.checked} onClick={() => this.setState(p=>({checked: !p.checked}))} className='check' type='checkbox' />
						</div>
						<p style={{color: mapHeadText[this.state.wall]}} className='heading'>RLA Chat</p>
					</header>
					
					
					<div style={this.state.checked?{display:'block'}:{display:'none'}} className='chatter'>
						<button className='chatter-close' onClick={()=>this.setState({checked:false})}>Close</button>
						<Stats />
						<div className='chat-input-container'>
							<ChatInput />
						</div>
					</div>
					

					<div ref={i=>this.sideRef=i} className='sidebar'>
						<div style={{backgroundColor: mapHead[this.state.wall]}} onClick={()=>this.setState(p=>({wall:p.wall<8?p.wall+1:0, showGradient: !p.showGradient}))} className='button' data-tip={'Change wallpaper'}>
							<MdWallpaper color={mapHeadText[this.state.wall]} className='icon' />
						</div>
						<div
							className={classnames('button', 'hide-videos', {
								on       : me.audioOnly,
								disabled : me.audioOnlyInProgress
							})}
							style={{backgroundColor: mapHead[this.state.wall]}}
							data-tip={'Show/hide participants\' video'}
							onClick={() =>
							{
								me.audioOnly
									? roomClient.disableAudioOnly()
									: roomClient.enableAudioOnly();
							}}
						>
							{me.audioOnly?<FaVideoSlash color={mapHeadText[this.state.wall]} className='icon' />:<FaVideo color={mapHeadText[this.state.wall]} className='icon' />}
						</div>

						<div
							className={classnames('button', 'mute-audio', {
								on : me.audioMuted
							})}
							style={{backgroundColor: mapHead[this.state.wall]}}
							data-tip={'Mute/unmute participants\' audio'}
							onClick={() =>
							{
								me.audioMuted
									? roomClient.unmuteAudio()
									: roomClient.muteAudio();
							}}
						>
							{me.audioMuted?<FaMicrophoneSlash color={mapHeadText[this.state.wall]} className='icon' />:<FaMicrophone color={mapHeadText[this.state.wall]} className='icon' />}
						</div>

						<div
							className={classnames('button', 'restart-ice', {
								disabled : me.restartIceInProgress
							})}
							style={{backgroundColor: mapHead[this.state.wall]}}
							data-tip='Refresh'
							onClick={() => roomClient.restartIce()}
						>
							<IoIosRefreshCircle color={mapHeadText[this.state.wall]} className='icon' />
						</div>
					</div>

					{/* <Stats /> */}

					<If condition={window.NETWORK_THROTTLE_SECRET}>
						<NetworkThrottle
							secret={window.NETWORK_THROTTLE_SECRET}
						/>
					</If>

					<ReactTooltip
						type='light'
						effect='solid'
						delayShow={100}
						delayHide={100}
						delayUpdate={50}
					/>
				</div>
			</Appear>
		);
	}

	componentDidMount()
	{
		const { roomClient }	= this.props;

		roomClient.join();
	}

	componentDidUpdate(){
		if(this.state.lockScreen){
			this.notRef.style.display='none';
			this.headRef.style.display='none';
			this.sideRef.style.display='none';
			this.linkRef.style.display='none';
			this.meRef.style.display='none';
		}else{
			this.notRef.style.display='block';
			this.headRef.style.display='block';
			this.sideRef.style.display='flex';
			this.linkRef.style.display='flex';
			this.meRef.style.display='block';
		}
	}
}

Room.propTypes =
{
	roomClient      : PropTypes.any.isRequired,
	room            : appPropTypes.Room.isRequired,
	me              : appPropTypes.Me.isRequired,
	amActiveSpeaker : PropTypes.bool.isRequired,
	onRoomLinkCopy  : PropTypes.func.isRequired
};

const mapStateToProps = (state) =>
{
	return {
		room            : state.room,
		me              : state.me,
		amActiveSpeaker : state.me.id === state.room.activeSpeakerId
	};
};

const mapDispatchToProps = (dispatch) =>
{
	return {
		onRoomLinkCopy : () =>
		{
			dispatch(requestActions.notify(
				{
					title: 'Class',
					text : 'Class code copied to the clipboard'
				}));
		}
	};
};

const RoomContainer = withRoomContext(connect(
	mapStateToProps,
	mapDispatchToProps
)(Room));

export default RoomContainer;
