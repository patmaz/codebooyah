import React, { Component } from 'react';

import { Intro } from './components/Intro';
import { Monitor } from './components/Monitor';
import { About } from './components/About';
import { Notifications } from './components/Notifications';
import './App.scss';

class App extends Component {
  render() {
    return (
      <div className="App">
        <div className="App-header">
          <h1>
            <span className="App-header-code"> &#60;code&#47;&#62;</span>
            <br />
            <span className="App-header-booyah">booyah!</span>
          </h1>
        </div>
        <div className="intro">
          <Intro/>
          <Monitor/>
          <About/>
          <Notifications/>
        </div>
      </div>
    );
  }
}

export default App;
