import React from 'react';

class ListItem extends React.Component {
   render() {
        return (
            <li>
                <h3>{this.props.itemFields.title}</h3>
                <p>{this.props.itemFields.body}</p>
            </li>
        )
   }
}

ListItem.propTypes = {
    itemFields: React.PropTypes.object.isRequired
}

export default ListItem;