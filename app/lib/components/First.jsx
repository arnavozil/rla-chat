import React from 'react';
import randomString from 'random-string';

class First extends React.Component{

    constructor(props){
        super(props);

        this.state = {
            hostName: '',
            guestName: '',
            classCode: '',
            random: Math.random() < .5 ? 'ahoy.jpg' : 'special-delivery.jpg'
        };
    }

    render(){
        const { random } = this.state;
        return(
            <div style={{background: `url('./../../resources/images/${random}')`}} data-component='First'>
                <div className='head'>
                    <p className='heading'>Rla Chat</p>
                </div>
                <div className='main'>
                    <p className='text'>Get Started in a tap</p>
                    <div className='create'>
                        {/* <p>Create Class</p> */}
                        <form className='form' onSubmit={(e) => {e.preventDefault();window.history.pushState(undefined, undefined, `/?info=true&displayName=${this.state.hostName}&roomId=${randomString({ length: 8 }).toLowerCase()}`);window.location.reload(false)}}>
                            <input className='input' value={this.state.hostName} onChange={({target}) => this.setState({hostName: target.value})} required placeholder='Name' type='text' />
                            {/* <br /> */}
                            <input className='button' type='submit' value='Create' />
                        </form>
                    </div>
                    <p className='divison'>OR</p>
                    <div className='join'>
                        {/* <p>Join Class</p> */}
                        <form className='form' onSubmit={(e) => {e.preventDefault();window.history.pushState(undefined, undefined, `/?info=true&displayName=${this.state.guestName}&roomId=${this.state.classCode}`);window.location.reload(false)}}>
                            <input className='input' value={this.state.guestName} onChange={({target}) => this.setState({guestName: target.value})} required placeholder='Name' type='text' />
                            {/* <br /> */}
                            <span className='and'>{'&'}</span>
                            <input className='input' style={{width: '35%'}} value={this.state.classCode} onChange={({target}) => this.setState({classCode: target.value})} required placeholder='Class Code' type='text' />
                            {/* <br /> */}
                            <input className='button' type='submit' value='Join' />
                        </form>
                    </div>
                </div>
            </div>
        )
    }
}

export default First;
