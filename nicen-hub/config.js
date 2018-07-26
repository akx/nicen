require('dotenv').config();
const NICEN_HOST = process.env.NICEN_HOST || '0.0.0.0';
const NICEN_PORT = parseInt(process.env.NICEN_PORT || '8042', 10);
const NICEN_PY_HOST = process.env.NICEN_PY_HOST || NICEN_HOST;
const NICEN_PY_PORT = parseInt(process.env.NICEN_PY_PORT || '42080', 10);
const NICEN_PY_URL = `http://${NICEN_PY_HOST}:${NICEN_PY_PORT}/`;
const NICEN_JS_HOST = process.env.NICEN_JS_HOST || NICEN_HOST;
const NICEN_JS_PORT = parseInt(process.env.NICEN_JS_PORT || '62080', 10);
const NICEN_JS_URL = `http://${NICEN_JS_HOST}:${NICEN_JS_PORT}/`;

module.exports = {
  NICEN_HOST,
  NICEN_PORT,
  NICEN_PY_HOST,
  NICEN_PY_PORT,
  NICEN_PY_URL,
  NICEN_JS_HOST,
  NICEN_JS_PORT,
  NICEN_JS_URL,
};
