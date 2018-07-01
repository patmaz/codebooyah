import React from 'react';

export class SW extends React.Component {
  state = {
    count: 10000,
    msg: 'message passed to SW',
  };

  triggerFuncInSW = () => {
    const messageChannel = new MessageChannel();
    messageChannel.port1.onmessage = event => {
      console.log('msg from SW ::', event.data);
    };
    navigator.serviceWorker.controller &&
      navigator.serviceWorker.controller.postMessage(
        {
          count: this.state.count,
          msg: JSON.stringify(this.state.msg.trim()),
          func: `
          let count = 0;
          while (count < this.count) {
          console.log('executing...');
          count++
          }
        `,
        },
        [messageChannel.port2],
      );
  };

  setMessage = e => {
    this.setState({
      msg: e.target.value,
    });
  };

  setCount = e => {
    this.setState({
      count: e.target.value,
    });
  };

  render() {
    return (
      <div>
        <p>
          This is a service worker sample. When you will click the trigger
          button, a while loop will be repeated{' '}
          <input
            type="number"
            onChange={this.setCount}
            defaultValue={this.state.count}
          />{' '}
          times. However you will not notice any lags in UI, because the
          function will be executed in background by a service worker. To see
          more details you can oped dev tools console. After all, the service
          worker will return{' '}
          <input
            type="text"
            onChange={this.setMessage}
            defaultValue={this.state.msg}
          />
        </p>
        <button onClick={this.triggerFuncInSW}>trigger</button>
      </div>
    );
  }
}
