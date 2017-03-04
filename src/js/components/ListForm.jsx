import React from 'react';


class ListForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            title: '',
            body: ''
        };
    }

    handleSubmit = (e) => {
        e.preventDefault();

        var data = {
            title: this.state.title,
            body: this.state.body
        }

        $.ajax({
            type: 'POST',
            url: '/mongo',
            data
        })
        .done((data) => {
            this.props.refreshClick();
        })
        .fail((jqXhr) => {
            console.error('failed');
        });
    }

    handleChange = (e) => {
        this.setState({[e.target.name]: e.target.value});
    }

   render() {
        return (
            <form onSubmit={this.handleSubmit}>
                <input type="text" name="title" onChange={this.handleChange} />
                <textarea type="text" name={"body"} onChange={this.handleChange} />
                <input type="submit" value="submit" />
            </form>
        )
   }
}

ListForm.propTypes = {
    refreshClick: React.PropTypes.func.isRequired
}

export default ListForm;