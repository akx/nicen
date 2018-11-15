import { css } from 'react-emotion';
import React, { Component } from 'react';

let CodeMirror = null;
const editorComponentLoadListeners = new Set();
import(/* webpackChunkName: "codemirror" */'./CodeMirror').then((module) => {
  CodeMirror = module.default;
  editorComponentLoadListeners.forEach((fn) => fn());
});

function getCodeMirrorModeForHandler(handler) {
  if (handler) {
    switch (handler.language) {
      case 'html':
        return 'htmlmixed';
      case 'c':
      case 'csharp':
      case 'graphql': // At least we get colored braces
      case 'java':
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

const fallbackTextareaCss = css({
  display: 'block',
  flex: 1,
  background: 'transparent',
  color: '#eee',
  fontFamily: 'fira code, menlo, monospace',
  lineHeight: '1.5',
});

class Editor extends Component {
  refreshEditorComponentChange = () => {
    this.forceUpdate();
  };

  componentDidMount() {
    editorComponentLoadListeners.add(this.refreshEditorComponentChange);
  }

  componentWillUnmount() {
    editorComponentLoadListeners.remove(this.refreshEditorComponentChange);
  }

  render() {
    const { handler, code, onChange } = this.props;
    if (!CodeMirror) {
      return (
        <textarea
          className={fallbackTextareaCss}
          value={code}
          onChange={(event) => {
            onChange(event.target.value);
          }}
        />
      );
    }
    return (
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
  }
}

export default Editor;
