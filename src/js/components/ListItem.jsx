import React from 'react';

class ListItem extends React.Component {
   render() {
        return (
            <tr>
                <td>{this.props.itemFields.title}</td>
                <td>{this.props.itemFields.body}</td>
                <td>{this.props.itemFields.date}</td>
                <td>{this.props.itemFields._id}</td>
            </tr>
        )
   }
}

ListItem.propTypes = {
    itemFields: React.PropTypes.object.isRequired
}

export default ListItem;