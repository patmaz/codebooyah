import React from 'react';
import style from './ToDoList.scss';

const ToDoList = props => <div>
        <ul className={style.ToDoList}>
            {props.data.map((data) =>
                <li key={data.id}>{data.text}<span onClick={() => props.removeToDo(data.id)}>x</span></li>
            )}
        </ul>
    </div>

export default ToDoList;