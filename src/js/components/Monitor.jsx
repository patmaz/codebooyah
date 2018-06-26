import React from 'react';

export class Monitor extends React.Component {
  state = {
    data: null,
    isVisible: true,
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
      <div id="iss" className={isVisible ? 'active' : 'noop'} onClick={this.toggleShow}>
        <h2>server-sent events</h2>
        <p>{data && data.usersNo || '...'} user(s) online</p>
        <p>server uptime: {data && data.uptime || '...'} sec</p>
        <p>memory usage: {data && data.memo || '...'} sec</p>
        <p>platform: {data && data.platform || '...'}</p>
      </div>
    )
  }
}