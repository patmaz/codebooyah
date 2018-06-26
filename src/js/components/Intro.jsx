import React from 'react';
import axios from 'axios';

import { Monitor } from './Monitor.jsx';
import { About } from './About.jsx';

class Intro extends React.Component {
    render() {
        return (
            <div className={'intro'}>
                <p>This is an old app</p>
              <Monitor/>
              <About/>
            </div>
        )
    }
}

export default Intro;