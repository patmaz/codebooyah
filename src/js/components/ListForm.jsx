import React from 'react';


class ListForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            title: '',
            body: ''
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleSubmit(e) {
        e.preventDefault();
        var formData = new FormData(),
            req = new XMLHttpRequest(),
            self = this;
        formData.append('title', this.state.title);
        formData.append('body', this.state.body);
        req.open("POST", "/mongo");
        req.send(formData);

        setTimeout(function(){ self.props.refreshClick(); }, 1000);
    }

    handleChange(e) {
        this.setState({[event.target.name]: event.target.value});
    }

   render() {
        return (
            <form onSubmit={this.handleSubmit}>
                <input type="text" name="title" onChange={this.handleChange} /><br />
                <textarea type="text" name="body" onChange={this.handleChange} /><br />
                <input type="submit" value="submit" />
            </form>
        )
   }
}

ListForm.propTypes = {
    refreshClick: React.PropTypes.func.isRequired
}

export default ListForm;