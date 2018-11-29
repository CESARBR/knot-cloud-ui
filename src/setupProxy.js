const proxy = require('http-proxy-middleware');

module.exports = (app) => {
  const apiHostname = process.env.API_HOSTNAME || process.env.API_HOST || 'localhost';
  const apiPort = process.env.API_PORT || 3003;
  const apiTarget = `http://${apiHostname}:${apiPort}`;

  const wsHostname = process.env.WS_HOSTNAME || 'localhost';
  const wsPort = process.env.WS_PORT || 3004;
  const wsTarget = `ws://${wsHostname}:${wsPort}`;

  app.use(proxy('/ws', {
    target: wsTarget,
    ws: true
  }));
  app.use(proxy('/api', {
    target: apiTarget,
    pathRewrite: { '^/api': '/' }
  }));
};
