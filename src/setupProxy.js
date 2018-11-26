const proxy = require('http-proxy-middleware');

module.exports = (app) => {
  const host = process.env.API_HOST || 'localhost';
  const port = process.env.API_PORT || 3003;
  const target = `http://${host}:${port}`;
  app.use(proxy('/api', {
    target,
    pathRewrite: { '^/api': '/' }
  }));
};
