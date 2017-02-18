import React from 'react';

class Intro extends React.Component {
   render() {
        return (
            <div className={'intro'}>
                <p>Welcome to my JavaScript sandbox. Have fun with:</p>
                <ul>
                    <li className={'intro__link'}>
                        <a className={'brackets'} href='#/gif'>gif search</a>
                        <div className={'intro__tags'}>
                            <span>reactjs</span>
                            <span>jsx</span>
                            <span>promise</span>
                            <span>ajax</span>
                        </div>
                    </li>
                    <li className={'intro__link'}>
                        <a className={'brackets'} href='#/chat'>simple chat</a>
                        <div className={'intro__tags'}>
                            <span>reactjs</span>
                            <span>jsx</span>
                            <span>nodejs</span>
                            <span>websocket</span>
                        </div>
                    </li>
                    <li className={'intro__link'}>
                        <a className={'brackets'} href='#/github'>my github repositories search engine</a>
                        <div className={'intro__tags'}>
                            <span>reactjs</span>
                            <span>jsx</span>
                            <span>promise</span>
                            <span>ajax</span>
                        </div>
                    </li>
                    <li className={'intro__link'}>
                        <a className={'brackets'} href='#/stopwatch'>react stopwatch</a>
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