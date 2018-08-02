import { Controlled as CodeMirror } from 'react-codemirror2';
import 'codemirror/lib/codemirror.css';
import 'codemirror/theme/material.css';

require('codemirror/mode/clike/clike');
require('codemirror/mode/css/css');
require('codemirror/mode/jsx/jsx');
require('codemirror/mode/markdown/markdown');
require('codemirror/mode/php/php');
require('codemirror/mode/python/python');
require('codemirror/mode/rust/rust');
require('codemirror/mode/sql/sql');

export default CodeMirror;
