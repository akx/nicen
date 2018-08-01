import { Controlled as CodeMirror } from 'react-codemirror2';
import 'codemirror/lib/codemirror.css';
import 'codemirror/theme/material.css';
import { css } from 'react-emotion';
import React from 'react';

require('codemirror/mode/clike/clike');
require('codemirror/mode/css/css');
require('codemirror/mode/jsx/jsx');
require('codemirror/mode/markdown/markdown');
require('codemirror/mode/php/php');
require('codemirror/mode/python/python');
require('codemirror/mode/rust/rust');

function getCodeMirrorModeForHandler(handler) {
  if (handler) {
    switch (handler.language) {
      case 'c':
      case 'graphql': // At least we get colored braces
        return 'clike';
      case 'javascript':
      case 'json':
      case 'typescript':
        return 'jsx';
      default:
        return handler.language;
    }
  }
  return undefined;
}

const codeMirrorCss = css({
  display: 'block',
  flex: 1,
  position: 'relative',
  '.CodeMirror': {
    fontFamily: 'fira code, menlo, monospace',
    lineHeight: '1.5',
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    height: '100%',
  },
});

const Editor = ({ handler, code, onChange }) => (
  <CodeMirror
    value={code}
    className={codeMirrorCss}
    options={{
      mode: getCodeMirrorModeForHandler(handler),
      theme: 'material',
      lineNumbers: true,
    }}
    onBeforeChange={(editor, data, value) => {
      onChange(value);
    }}
  />
);

export default Editor;
