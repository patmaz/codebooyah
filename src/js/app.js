import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Route, Link, browserHistory, hashHistory} from 'react-router';
import Intro from './components/Intro.jsx';
import ListItems from './components/ListItems.jsx';
import SearchGifApp from './components/SearchGifApp.jsx';

ReactDOM.render(
    <Router history={hashHistory}>
        <Route path='/' component={() => (<Intro />)} />
        <Route path='/list' component={() => (<ListItems />)} />
        <Route path='/gif' component={() => (<SearchGifApp />)} />
    </Router>,
    document.getElementById('app'));