import React from 'react';
import ToDo from './ToDo.jsx';
import style from './ToDoList.scss';

const ToDoList = props => <div>
        <ul className={style.ToDoList}>
            {props.data.map((item) =>
                <ToDo key={item.id} id={item.id} innerText={item.text} removeToDo={props.removeToDo} />)}
        </ul>
    </div>

export default ToDoList;