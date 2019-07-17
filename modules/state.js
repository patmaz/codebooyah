const Observer = require('../store/Observer');

const connectionsObserver = new Observer();
let _connections = 0;
connectionsObserver.subscribe((numberOfConnections) => _connections = numberOfConnections);

let _stats = 0;
const statsObserver = new Observer();
statsObserver.subscribe(() => _stats++);

const getConnection = () => _connections;
const getStats = () => _stats;

module.exports = {
  connections: () => getConnection(),
  connectionsObserver,
  stats: () => getStats(),
  statsObserver,
};