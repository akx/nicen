import React from 'react';
import Editor from './Editor';
import styled from 'react-emotion';

const OutputSection = styled('section')({
  flex: 1,
  display: 'flex',
  flexDirection: 'column',
  minWidth: 0,
});

const MessageBar = styled('div')({
  padding: '.5em',
  background: '#9ed9cb',
  color: '#103040',
  '&.error': {
    background: 'orangered',
    color: '#fff',
  },
});

const OutputView = ({ result, handler }) => {
  let isError = false;
  let message;
  if (result) {
    if (result.error) {
      isError = true;
    }
    const mData = { ...result };
    delete mData.content;
    message = mData.error || JSON.stringify(mData, null, 1).replace(/\n/g, ' ');
  }
  return (
    <OutputSection id="output">
      <MessageBar id="message" className={isError ? 'error' : undefined}>{message}</MessageBar>
      <Editor code={result.content} handler={handler} />
    </OutputSection>
  );
};

export default OutputView;
