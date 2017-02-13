import React from 'react';

class Intro extends React.Component {
   render() {
        return (
            <div id="intro">
                <p>Welcome to my JavaScript sandbox. Have fun with:</p>
                <a href='#/gif'>react gif search</a><br />
                <a href='#/chat'>simple node.js/react chat</a>
            </div>
        )
   }
}

export default Intro;