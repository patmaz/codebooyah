import React from 'react';

class Intro extends React.Component {
   render() {
        return (
            <div className={'intro'}>
                <p>Welcome to my JavaScript sandbox. Have fun with:</p>
                <ul>
                    <li className={'intro__link'} data-href={'#/gif'}>
                        <span>gif search</span>
                        <div className={'intro__tags'}>
                            <span>reactjs</span>
                            <span>jsx</span>
                            <span>promise</span>
                            <span>ajax</span>
                            <span>web speech api</span>
                        </div>
                    </li>
                    <li className={'intro__link'} data-href={'#/chat'}>
                        <span>simple text chat (+video beta)</span>
                        <div className={'intro__tags'}>
                            <span>reactjs</span>
                            <span>jsx</span>
                            <span>nodejs</span>
                            <span>websocket</span>
                            <span>webRTC</span>
                        </div>
                    </li>
                    <li className={'intro__link'} data-href={'#/github'}>
                        <span>my github repositories search engine</span>
                        <div className={'intro__tags'}>
                            <span>reactjs</span>
                            <span>jsx</span>
                            <span>promise</span>
                            <span>ajax</span>
                        </div>
                    </li>
                    <li className={'intro__link'} data-href={'#/stopwatch'}>
                        <span>react stopwatch</span>
                        <div className={'intro__tags'}>
                            <span>ES6</span>
                            <span>reactjs</span>
                            <span>jsx</span>
                            <span>localStorage</span>
                        </div>
                    </li>
                </ul>
            </div>
        )
   }
}

export default Intro;