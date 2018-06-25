import React, { Component } from 'react';
import axios from 'axios';

import './App.scss';

class App extends Component {
  componentDidMount() {
    axios.get('/api/intro').then(result => {
      console.log(result);
    });
  }
  render() {
    return (
      <div className="App">
        <div id="App-header">
          <h1>
            <span className="App-header-code"> &#60;code&#47;&#62;</span>
            <br />
            <span className="App-header-booyah">booyah!</span>
          </h1>
        </div>
      </div>
    );
  }
}

export default App;
