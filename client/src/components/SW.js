import React from 'react';

import './SW.scss';

export class SW extends React.Component {
  state = {
    count: 3000,
    msg: 'message passed to SW',
  };

  componentDidMount() {
    this.startSpinner();
  }

  componentWillUnmount() {
    clearInterval(this.spin);
  }

  heavyFunc = number => {
    let count = 0;
    while (count < number) {
      console.log('executing in app...');
      count++;
    }
  };

  startSpinner = () => {
    this.spin && clearInterval(this.spin);
    let deg = 0;
    this.spin = setInterval(() => {
      if (deg === 361) {
        deg = 0;
      }
      this.spinner.style.transform = `rotate(${deg}deg)`;
      deg++;
    }, 1000 / 30);
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
          console.log('executing in SW...');
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
    const value = e.target.value;
    if (value > 5000) {
      return;
    }
    this.setState({
      count: e.target.value,
    });
  };

  render() {
    return (
      <div>
        <p>
          This is a service worker example, mainly for Chrome browser. When you
          click the trigger button, a while loop will be repeated{' '}
          <input
            type="number"
            onChange={this.setCount}
            value={this.state.count}
          />{' '}
          times. However you will not notice any serious lags in UI (look at the
          spinner controlled by js), because the function will be executed in a
          background/separate thread, by a service worker. To see more details,
          you can open dev tools console. After all, the service worker will
          return{' '}
          <input
            type="text"
            onChange={this.setMessage}
            defaultValue={this.state.msg}
          />
          in console.
        </p>
        <button onClick={this.triggerFuncInSW}>trigger in SW</button>
        <p>
          Now you can trigger the very same function in this web app. Lags may
          appear, the app may be unresponsive for a while (if not, probably your
          hardware is superb ;)).
        </p>
        <button onClick={() => this.heavyFunc(this.state.count)}>
          trigger in app
        </button>
        <div className="circle" ref={ref => (this.spinner = ref)}>
          {' '}
        </div>
      </div>
    );
  }
}
