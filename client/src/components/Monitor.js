import React from 'react';

import './Monitor.scss';

export class Monitor extends React.Component {
  state = {
    data: null,
    isVisible: false,
  };

  componentDidMount() {
    this.stream = new EventSource("/sse");
    this.stream.onopen = function() {
      console.info('Opened SSE connection');
    };
    this.stream.onmessage = (event) => {
      const data = JSON.parse(event.data);
      this.setState({
        data,
      })
    };

    this.stream.onclose = (code, reason) => {
      console.error(code, reason);
    };
  }

  componentWillUnmount() {
    this.stream.close();
  }

  toggleShow = () => {
    this.setState({
      isVisible: !this.state.isVisible,
    })
  };

  render() {
    const { data, isVisible } = this.state;
    return (
      <div id="monitor" className={isVisible ? 'active' : 'noop'} onClick={this.toggleShow}>
        <h2>server-sent events</h2>
        <p className="small">{data && data.usersNo || '...'} user(s) online</p>
        <p className="small">server uptime: {data && data.uptime || '...'} sec</p>
        <p className="small">memory usage: {data && data.memo || '...'} sec</p>
        <p className="small">platform: {data && data.platform || '...'}</p>
      </div>
    )
  }
}