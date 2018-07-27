import React from 'react';

const OutputView = ({ result }) => {
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
      <textarea id="code" readOnly value={result.content} />
    </section>
  );
};

export default OutputView;
