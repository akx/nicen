require('dotenv').config();
const NICEN_HOST = process.env.NICEN_HOST || '0.0.0.0';
const NICEN_PORT = parseInt(process.env.NICEN_PORT || '8042', 10);
const NICEN_PY_HOST = process.env.NICEN_PY_HOST || NICEN_HOST;
const NICEN_PY_PORT = parseInt(process.env.NICEN_PY_PORT || '42080', 10);
const NICEN_PY_URL = `http://${NICEN_PY_HOST}:${NICEN_PY_PORT}/`;

module.exports = {
  NICEN_HOST,
  NICEN_PORT,
  NICEN_PY_HOST,
  NICEN_PY_PORT,
  NICEN_PY_URL,
};