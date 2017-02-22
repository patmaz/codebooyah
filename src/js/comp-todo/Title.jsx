import React from 'react';
import style from './Title.css';

const Title = props => <h1 className={style.Title}>{props.title} :: {props.listLength}</h1>

export default Title;