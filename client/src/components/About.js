import React from 'react';

import './About.scss';

export class About extends React.Component {
  state = {
    isVisible: false,
  };

  toggleShow = e => {
    if (e.target.nodeName === 'A') {
      return;
    }
    this.setState({
      isVisible: !this.state.isVisible,
    })
  };

  render() {
    const { isVisible } = this.state;
    return (
      <div onClick={this.toggleShow} className={isVisible ? "about code show" : "about code"}>
        <div className="about__inner">
          <span>{'< web dev/>'}</span>
          <span className="brackets"><a href="https://github.com/patmaz" target="_blank" rel="noopener noreferrer">github</a></span>
          <span className="brackets"><a href="https://www.linkedin.com/in/patmazurkiewicz" target="_blank" rel="noopener noreferrer">linkedin</a></span>
          <span>{'< hobbies/>'}</span>
          <span className="brackets"><a href="http://yt.codebooyah.com/" target="_blank" rel="noopener noreferrer">youtube</a></span>
          <span className="brackets"><a href="http://insta.codebooyah.com/" target="_blank" rel="noopener noreferrer">instagram</a></span>
          <span className="brackets"><a href="http://beer.codebooyah.com/" target="_blank" rel="noopener noreferrer">craft beer</a></span>
        </div>
      </div>
    )
  }
}