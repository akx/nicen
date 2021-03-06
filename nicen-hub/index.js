const express = require('express');
const body = require('body-parser');
const multer = require('multer');

const config = require('./config');

const app = express();

app.use(body.json({limit: '200mb'}));
app.use(body.urlencoded({extended: true, limit: '200mb'}));
app.use(multer().array());
app.use('/', express.static('public', {index: 'index.html'}));
app.use('/', express.static('spec'));
app.get('/handlers', (req, res) => {
  const handlers = require('./handlers').map((h0) => {
    const h = {...h0};
    delete h.process;
    return h;
  });
  res.json(handlers);
});
app.post('/', require('./process'));

app.listen(config.NICEN_PORT, config.NICEN_HOST, (err) => {
  if (err) throw err;
  console.log(`[nicen-hub] listening on ${config.NICEN_HOST}:${config.NICEN_PORT}`);
})
