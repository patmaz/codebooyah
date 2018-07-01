self.addEventListener('notificationclose', function(e) {
  const notification = e.notification;
  const primaryKey = notification.data.primaryKey;
});

self.addEventListener('notificationclick', function(e) {
  const notification = e.notification;
  const primaryKey = notification.data.primaryKey;
  const action = e.action;

  if (action === 'close') {
    notification.close();
  } else {
    clients.openWindow('https://codebooyah.com');
    notification.close();
  }
});

self.addEventListener('push', function(e) {
  let body;

  if (e.data) {
    body = e.data.text();
  } else {
    body = 'Push message no payload';
  }

  const options = {
    body: body,
    vibrate: [100, 50, 100],
    data: {
      dateOfArrival: Date.now(),
      primaryKey: 1
    },
  };

  e.waitUntil(
    self.registration.showNotification('codebooyah.com', options)
  );
});

self.addEventListener('message', e => {
  this.count = e.data.count;
  const msg = e.data.msg;
  const fn = new Function(e.data.func);
  fn();
  e.ports[0].postMessage(msg);
});