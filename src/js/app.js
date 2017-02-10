import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Route, Link, browserHistory} from 'react-router';
import Intro from './components/Intro.jsx';
import ListItems from './components/ListItems.jsx';

var introProps = {
    header: 'code booyah! sooooooon'
}

ReactDOM.render(
    <Router history={browserHistory}>
        <Route path='/' component={() => (<Intro properties={introProps} />)} />
        <Route path='/list' component={() => (<ListItems />)} />
    </Router>,
    document.getElementById('app'));