import React from 'react';
import Editor from './Editor';

const OutputView = ({ result, handler }) => {
  const className = [];
  let message;
  if (result) {
    if (result.error) {
      className.push('error');
    }
    if (result.content) {
      className.push('success');
    }
    const mData = { ...result };
    delete mData.content;
    message = mData.error || JSON.stringify(mData, null, 1).replace(/\n/g, ' ');
  }
  return (
    <section id="output" className={className.join(' ')}>
      <div id="message">{message}</div>
      <Editor code={result.content} handler={handler} />
    </section>
  );
};

export default OutputView;
