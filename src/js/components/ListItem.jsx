import React from 'react';


class ListItem extends React.Component {
   render() {
        return (
            <li>
                <h3>{this.props.properties.title}</h3>
                <p>{this.props.properties.body}</p>
            </li>
        )
   }
}

ListItem.propTypes = {
    properties: React.PropTypes.object.isRequired
}

export default ListItem;