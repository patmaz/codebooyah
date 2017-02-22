import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Route, Link, browserHistory, hashHistory} from 'react-router';
import Intro from './components/Intro.jsx';
import ListItems from './components/ListItems.jsx';
import SearchGifApp from './components/SearchGifApp.jsx';
import Chat from './components/Chat.jsx';
import GithubSearch from './components/GithubSearch.jsx';
import Stopwatch from './components/Stopwatch.jsx';
import ToDo from './comp-todo/containers/App.jsx';

ReactDOM.render(
    <Router history={hashHistory}>
        <Route path='/' component={() => (<Intro />)} />
        <Route path='/list' component={() => (<ListItems />)} />
        <Route path='/gif' component={() => (<SearchGifApp />)} />
        <Route path='/chat' component={() => (<Chat />)} />
        <Route path='/github' component={() => (<GithubSearch />)} />
        <Route path='/stopwatch' component={() => (<Stopwatch />)} />
        <Route path='/todo' component={() => (<ToDo />)} />
    </Router>,
    document.getElementById('app'));