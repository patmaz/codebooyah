import React from 'react';

import './Webworker.scss';

export class Webworker extends React.Component {
  state = {
    count: 3000,
    msg: 'wooohoo!',
  };
  webWorker = null;

  componentDidMount() {
    if (window.Worker) {
      this.webWorker = new Worker('/ww.js');
    }
    this.startSpinner();
  }

  componentWillUnmount() {
    this.webWorker && this.webWorker.terminate();
    clearInterval(this.spin);
  }

  fib = n => {
    const _n = parseInt(n)-1;
    let arr = [0, 1];
    for (let i = 2; i < _n + 1; i++){
      arr.push(arr[i - 2] + arr[i -1])
      console.log(arr)
    }
    return arr[n]
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

  triggerFuncInWW = () => {
    const messageChannel = new MessageChannel();
    messageChannel.port1.onmessage = event => {
      console.log('msg from SW ::', event.data);
    };
    this.webWorker.postMessage(
      {
        count: this.state.count,
        msg: this.state.msg.trim(),
        func: `
          const _n = parseInt(this.count)-1;
          let arr = [0, 1];
          for (let i = 2; i < _n + 1; i++){
           arr.push(arr[i - 2] + arr[i -1])
           console.log('in web worker ::', arr);
          }
          return arr;
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
      count: value,
    });
  };

  render() {
    return (
      <div>
        <p>
          This is a web worker example. When you click the trigger button, a{' '}
          <a
            href="https://medium.com/quick-code/fibonacci-sequence-javascript-interview-question-iterative-and-recursive-solutions-6a0346d24053"
            target="_blank"
            rel="noopener noreferrer"
          >
            Fibonacci sequence
          </a>{' '}
          of{' '}
          <input
            type="number"
            onChange={this.setCount}
            value={this.state.count}
          />{' '}
          numbers will be generated. However you will not notice any serious
          lags in UI (look at the spinner controlled by js), because the
          function will be executed in a background/separate thread, by a web
          worker. To see more details, you can open dev tools console. After
          all, the web worker will return{' '}
          <input
            type="text"
            onChange={this.setMessage}
            defaultValue={this.state.msg}
          />
          in console.
        </p>
        <button onClick={this.triggerFuncInWW}>trigger in web worker</button>
        <p>
          Now you can trigger the very same function in this web app. Lags may
          appear, the app may be unresponsive for a while (if not, probably your
          hardware is superb ;)).
        </p>
        <button onClick={() => this.fib(this.state.count)}>
          trigger in app
        </button>
        <div className="circle" ref={ref => (this.spinner = ref)}>
          {' '}
        </div>
      </div>
    );
  }
}
