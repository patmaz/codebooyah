import React from 'react';

class Intro extends React.Component {
   render() {
        return (
            <h1>{this.props.properties.header}</h1>
        )
   }
}

Intro.propTypes = {
    properties: React.PropTypes.object.isRequired
}

export default Intro;
