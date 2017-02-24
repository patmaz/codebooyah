import React from 'react';
import style from './ToDoForm.scss';

class ToDoForm extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            inputContent: ''
        }
    }

    onChangeHandler = (e) => {
        this.setState({inputContent: e.target.value});
    }

    emptyInput = () => {
        this.setState({inputContent: ''});
    }

    render(){
        return (
            <div className={style.ToDoForm}>
                <input  type={'text'}
                        value={this.state.inputContent}
                        onChange={this.onChangeHandler}/>
                <button onClick={() => {
                            this.props.addToDo(this.state.inputContent);
                            this.emptyInput();
                        }}>ADD</button>
            </div>
        )
    }
}

export default ToDoForm;