import React from 'react';
import ReactDOM from 'react-dom';
import Intro from './components/Intro.jsx';

var properties = {
    header: 'code booyah! soon'
}
ReactDOM.render(<Intro properties={properties} />, document.getElementById('app'));