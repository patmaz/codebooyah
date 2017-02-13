import React from 'react';

class Chat extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            name: '',
            newMsg: '',
            allMsg: [],
            ws: new WebSocket('ws://localhost:8000', 'echo-protocol')
        }

        this.typeMsg = this.typeMsg.bind(this);
        this.typeName = this.typeName.bind(this);
        this.sendMsg = this.sendMsg.bind(this);
    }

    componentDidMount() {
        var self = this;
        self.state.ws.addEventListener('open', function(e){
            console.log(e);
        });
        self.state.ws.addEventListener('message', function(e) {
            var msg = e.data;
            var msgArr = self.state.allMsg;
            msgArr.unshift(msg);
            self.setState({allMsg: msgArr});
        });
    }

    typeMsg(e) {
        this.setState({newMsg: e.target.value});
    }

    typeName(e) {
        this.setState({name: e.target.value});
    }

    sendMsg(e) {
        if (e.type === 'click' || (e.type === 'keyup' && e.keyCode === 13)) {
            this.state.ws.send(this.state.name + ' : ' + this.state.newMsg);
            this.setState({newMsg: ''});
        }
    }

    render() {
        return (
            <div className={'chat'}>
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