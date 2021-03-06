const express = require('express');
const morgan = require('morgan');
const path = require('path');
const healthcheck = require('express-meshblu-healthcheck');
const setupProxy = require('../src/setupProxy');

const app = express();

app.use(morgan(':remote-addr - :remote-user [:date[clf]] ":method :url HTTP/:http-version" :status :res[content-length] :response-time ms'));
app.use(healthcheck());

setupProxy(app);

app.use(express.static(path.resolve(__dirname, '..', 'build')));
app.get('*', (req, res) => {
  res.sendFile(path.resolve(__dirname, '..', 'build', 'index.html'));
});

app.listen(process.env.PORT || 80);
