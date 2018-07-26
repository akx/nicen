require('dotenv').config();
const express = require('express');
const body = require('body-parser');
const multer = require('multer');

const handlers = require('./handlers');
const process = require('./process');

const app = express();

app.use(body.json());
app.use(body.urlencoded({extended: true}));
app.use(multer().array());
app.use('/', express.static('public', {index: 'index.html'}));
app.post('/', process);

const host = process.env.HOST || '0.0.0.0';
const port = parseInt(process.env.PORT || '8042', 10);
app.listen(port, host, (err) => {
  if (err) throw err;
  console.log(`listening on ${host}:${port}`);
})
