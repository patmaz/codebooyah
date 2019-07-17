const moment = require('moment');
const Observer = require('../store/Observer');

const connectionsObserver = new Observer();
let _connections = 0;
connectionsObserver.subscribe((numberOfConnections) => _connections = numberOfConnections);

let _stats = 0;
let _last5Visits = [];
const statsObserver = new Observer();
statsObserver.subscribe(() => {
  _stats++;
  _last5Visits.push(moment().format('lll'));
  _last5Visits = _last5Visits.splice(-5);
});

const getConnection = () => _connections;
const getStats = () => _stats;
const getVisitis = () => _last5Visits;

module.exports = {
  connections: () => getConnection(),
  connectionsObserver,
  stats: () => getStats(),
  last5Visits: () => getVisitis(),
  statsObserver,
};