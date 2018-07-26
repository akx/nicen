require('dotenv').config();
const express = require('express');
const body = require('body-parser');
const multer = require('multer');

const handlers = require('./handlers');

const app = express();

app.use(body.json());
app.use(body.urlencoded({extended: true}));
app.use(multer().array());
app.use('/', express.static('public', {index: 'index.html'}));
app.get('/handlers', (req, res) => {
  const handlers = require('./handlers').map((h0) => {
    const h = {...h0};
    delete h.process;
    return h;
  });
  res.json(handlers);
});
app.post('/', require('./process'));

const host = process.env.NICEN_HOST || '0.0.0.0';
const port = parseInt(process.env.NICEN_PORT || '8042', 10);
app.listen(port, host, (err) => {
  if (err) throw err;
  console.log(`listening on ${host}:${port}`);
})
