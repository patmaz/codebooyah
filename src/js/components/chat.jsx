import React from 'react';

class Chat extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            name: '',
            newMsg: '',
            allMsg: []
        }
    }

    socket = io('/chat')

    componentDidMount = () => {
        this.socket.on('connect', (data) => {
            this.socket.emit('join', 'Hello World from client');
        });
        this.socket.on('messages', (data) => {
            var msg = data;
            var msgArr = this.state.allMsg;
            msgArr = [msg, ...msgArr];
            this.setState({allMsg: msgArr});
        });
    }

    componentWillUnmount = () => {
        this.socket.socket.disconnect();
    }

    typeMsg = (e) => {
        this.setState({newMsg: e.target.value});
    }

    typeName = (e) => {
        this.setState({name: e.target.value});
    }

    sendMsg = (e) => {
        if (e.type === 'click' || (e.type === 'keyup' && e.keyCode === 13)) {
            this.socket.emit('messages', this.state.name + ' : ' + this.state.newMsg);
            this.setState({newMsg: ''});
        }
    }

    render() {
        return (
            <div className={'chat'}>
                <div className={'chat__video'}>
                    <p className={'small'}>Experimental video chat. It will get crazy when more then 2 users click Start :P</p>
                    <iframe src={'/static/rtc/index.html'}></iframe>
                </div>
                <input  value={this.state.name}
                        type={'text'}
                        onChange={this.typeName}
                        placeholder={'type your name'}
                        className={'chat__input-name'}/><br />
                <textarea   value={this.state.newMsg}
                            onChange={this.typeMsg}
                            onKeyUp={this.sendMsg}
                            placeholder={'type your message'}
                            className={'chat__input-msg'}/>
                <button onClick={this.sendMsg}
                        className={'chat__btn'}> SEND </button><span> or press enter</span>
                <ul className={'chat__msgs'}>
                    {this.state.allMsg.map((item, index) => <li className={'chat__msg'} key={index}> {item} </li>)}
                </ul>
            </div>
        )
    }
}

export default Chat;