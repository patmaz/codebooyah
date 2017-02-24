import React from 'react';
import style from './ToDo.scss';

const ToDo = props =>
    <li className={style.ToDo}>{props.innerText}<span onClick={() => props.removeToDo(props.id)}>x</span></li>

export default ToDo;