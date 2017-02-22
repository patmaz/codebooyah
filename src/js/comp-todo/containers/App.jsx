import React from 'react';
import uuid from 'uuid';
import style from './App.css';
import Title from '../Title.jsx'

class App extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            data: []
        }
    }

    addToDo(val) {
        const todo = {
            text: val,
            id: uuid.v4()
        }
        const data = [...this.state.data, todo];
        this.setState({data});
    }

    removeToDo(id) {
        const remainder = this.state.data.filter(todo => todo.id !== id);
        this.setState({data: remainder});
    }

    render() {
        return (
            <div className={style.ToDoApp}>
                <Title title={'title'} listLength={this.state.data.length} />
            </div>
        )
    }
}

export default App;