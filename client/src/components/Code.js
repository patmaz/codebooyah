import React from 'react';
import PropTypes from 'prop-types';
import queryString from 'query-string';
import { Link } from 'react-router-dom';

import './Code.scss';

export class Code extends React.Component {
  static propTypes = {
    location: PropTypes.object.isRequired,
  };

  render() {
    return (
      <div className="overlay">
        <div className="codeWrapper">
          <Link to={'/'} className="close">close</Link>
          <iframe
            title={'code'}
            src={queryString.parse(this.props.location.search).url}
            frameBorder="0"
            height="100%"
            width="90%"
            sandbox="allow-modals allow-forms allow-popups allow-scripts allow-same-origin"
          />
        </div>
      </div>
    );
  }
}

