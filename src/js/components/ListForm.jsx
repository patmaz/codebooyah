import React from 'react';


class ListForm extends React.Component {
   render() {
        return (
            <form method="post" action="/mongo">
                title: <input type="text" id="title" name="title" /><br />
                body: <textarea type="text" id="body" name="body" /><br />
                <input type="submit" value="submit" onClick={this.props.refreshClick} />
            </form>
        )
   }
}

ListForm.propTypes = {
    refreshClick: React.PropTypes.func.isRequired
}

export default ListForm;