import React from 'react';

class Intro extends React.Component {
   render() {
        return (
            <div id="intro">
                <p>Welcome to my JavaScript sandbox. Have fun with:</p>
                <ul>
                    <li><a href='#/gif'>react gif search</a><br /></li>
                    <li><a href='#/chat'>simple node.js/react chat</a></li>
                    <li><a href='#/github'>my github repositories search on react</a></li>
                </ul>
            </div>
        )
   }
}

export default Intro;