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
        var self = this;

        var data = {
            title: this.state.title,
            body: this.state.body
        }

        $.ajax({
            type: 'POST',
            url: '/mongo',
            data: data,
            beforeSend: function() {console.log('before send')}
        })
        .done(function(data) {
            self.props.refreshClick();
        })
        .fail(function(jqXhr) {
            console.log('failed');
        });
    }

    handleChange(e) {
        this.setState({[e.target.name]: e.target.value});
    }

   render() {
        return (
            <form onSubmit={this.handleSubmit}>
                <input type="text" name="title" onChange={this.handleChange} /><br />
                <textarea type="text" name={"body"} onChange={this.handleChange} /><br />
                <input type="submit" value="submit" />
            </form>
        )
   }
}

ListForm.propTypes = {
    refreshClick: React.PropTypes.func.isRequired
}

export default ListForm;