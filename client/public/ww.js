self.onmessage = (e) => {
  this.count = e.data.count;
  const msg = e.data.msg;
  const fn = new Function(e.data.func);
  fn();
  e.ports[0].postMessage(msg);
};