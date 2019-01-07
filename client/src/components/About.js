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
          <span className="brackets"><a href="https://github.com/patmaz" target="_blank" rel="noopener noreferrer">github</a></span>
          <span className="brackets"><a href="https://codesandbox.io/u/patmaz" target="_blank" rel="noopener noreferrer">codesandbox</a></span>
          <span className="brackets"><a href="https://www.linkedin.com/in/patmazurkiewicz" target="_blank" rel="noopener noreferrer">linkedin</a></span>
        </div>
      </div>
    )
  }
}