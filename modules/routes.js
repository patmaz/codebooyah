const firebase = require('firebase');
const path = require('path');
const webPush = require('web-push');
const appDir = path.dirname(require.main.filename);

const config = require('../config');

firebase.initializeApp(config.firebase);
const intro = firebase.database().ref('introv2/');
const subscriptions = firebase.database().ref('sub/');
const refMsg = firebase.database().ref('subMsg/');

let refMsgCounter = 0;
refMsg
  .on('value', () => {
    if (refMsgCounter > 0) {
      fetchPushSub(sendPush);
    }
    refMsgCounter++;
  });

fetchPushSub = cb => {
  const ref = subscriptions;

  refMsg
    .once('value')
    .then(msg => {
      ref
        .once('value')
        .then(snapshot => {
          const subs = snapshot.val();

          for (let key in subs) {
            if (subs.hasOwnProperty(key)) {
              cb(subs[key], msg.val());
            }
          }
        })
        .catch(err => console.error(err));
    })
    .catch(err => console.error(err));
};

const options = {
  gcmAPIKey: config.gcmAPIKey,
  vapidDetails: config.vapidDetails,
  TTL: 60,
};

sendPush = (sub, payload) => {
  webPush
    .sendNotification(sub, payload, options)
    .catch(err => console.log(err));
};

savePushSub = ({ sub, key }, cb) => {
  const ref = subscriptions;

  if (key !== null) {
    const item = ref.child(key);
    item.update(
      {
        endpoint: sub.endpoint,
        keys: sub.keys,
      },
      err => {
        if (err) {
          return cb(false, err);
        }
        cb(true, { data: 'success' });
      },
    );
    return;
  }

  const refPush = subscriptions.push();
  refPush.set(
    {
      endpoint: sub.endpoint,
      keys: sub.keys,
    },
    err => {
      if (err) {
        return cb(false, err);
      }

      cb(true, { subDbKey: refPush.key });
    },
  );
};

function routes(app) {
  app.get('/api/intro', (req, res) => {
    intro
      .once('value')
      .then(snapshot => {
        res.json(snapshot.val());
      })
      .catch(err => res.status(500).json(err));
  });

  app.post('/api/push/sub', (req, res) => {
    const sub = req.body;

    if (!sub) {
      return res.status(422).json({ data: 'no data provided' });
    }

    savePushSub(sub, (success, data) => {
      if (!success) {
        return res.status(500).json(data);
      }

      if (success) {
        return res.status(200).json(data);
      }
    });
  });

  // new client
  app.get('/', (reg, res) => {
    res.sendFile(path.join(appDir + '/client/build/index.html'));
  });

  app.get('/sw', (reg, res) => {
    res.sendFile(path.join(appDir + '/client/build/sw.js'));
  });

  // old client
  app.get('/old/', (req, res) => {
    res.sendFile(path.join(appDir + '/public/index.html'));
  });
}

module.exports = routes;
