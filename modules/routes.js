const firebase = require('firebase');
const path = require('path');
const appDir = path.dirname(require.main.filename);

const config = require('../config');

firebase.initializeApp(config.firebase);
const intro = firebase.database().ref('introv2/');

function routes(app) {
  app.get('/api/intro', (req, res) => {
    intro
      .once('value')
      .then(snapshot => {
        res.json(snapshot.val());
      })
      .catch(err => res.status(500).json(err));
  });

  // new client
  app.get('/', (reg, res) => {
    res.sendFile(path.join(appDir + '/client/build/index.html'));
  });

  // old client
  app.get('/old/', (req, res) => {
    res.sendFile(path.join(appDir + '/public/index.html'));
  });
}

module.exports = routes;