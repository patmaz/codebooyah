import React from 'react';

class Intro extends React.Component {
    render() {
        return (
            <div className={'intro'}>
                <p>Welcome to my JavaScript sandbox. Have fun with:</p>
                <ul>
                    <li className={'intro__link'} data-href={'https://codebooyah.com/static/vrapp/'}>
                        <span>first sample VR app</span>
                        <div className={'intro__tags'}>
                            <span>reactVR</span>
                        </div>
                    </li>
                    <li className={'intro__link'} data-href={'/lorem/10'}>
                        <span>experimental public API</span>
                        <span className="descr">lorem ipsum generator example request: curl -H "authorization: json_web_token" http://api.codebooyah.com/lorem/number_of_words</span>
                        <span className="descr">click for sample of 10 words</span>
                        <div className={'intro__tags'}>
                            <span>nodejs</span>
                            <span>mongodb</span>
                            <span>JWT</span>
                            <span>CORS</span>
                        </div>
                    </li>
                    <li className={'intro__link'} data-href={'http://chat.codebooyah.com/'}>
                        <span>text chat with dynamic rooms</span>
                        <div className={'intro__tags'}>
                            <span>reactjs</span>
                            <span>redux</span>
                            <span>jsx</span>
                            <span>nodejs</span>
                            <span>socket.io</span>
                            <span>auth0</span>
                            <span>firebase</span>
                            <span>session in redis</span>
                        </div>
                    </li>
                    <li className={'intro__link'} data-click={'iss'}>
                        <span>server-sent events</span>
                        <div className={'intro__tags'}>
                            <span>server-sent events</span>
                            <span>nodejs</span>
                        </div>
                    </li>
                    <li className={'intro__link'} data-href={'#/gif'}>
                        <span>speech gif search</span>
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
                    <li className={'intro__link'} data-href={'http://neuropedia.pl'}>
                        <span>neuropedia.pl</span>
                        <div className={'intro__tags'}>
                            <span>angularjs</span>
                            <span>jquery</span>
                            <span>nodejs</span>
                            <span>mongodb</span>
                        </div>
                    </li>
                </ul>
            </div>
        )
    }
}

export default Intro;