import React from 'react';
import styled from '@emotion/styled';
import Editor from './Editor';
import { delay } from './utils';

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
  const [isCopied, setIsCopied] = React.useState(false);
  React.useEffect(() => {
    setIsCopied(false);
  }, [result.content]);
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
      <MessageBar id="message" className={isError ? 'error' : undefined}>
        {message}
      </MessageBar>
      <Editor code={result.content} handler={handler} />

      <button
        type="button"
        onClick={() => navigator.clipboard
          .writeText(result.content)
          .then(() => setIsCopied(true))
          .then(() => delay(500))
          .then(() => setIsCopied(false))}
      >
        {isCopied ? 'Copied!' : 'Copy that code!'}
      </button>
    </OutputSection>
  );
};

export default OutputView;
