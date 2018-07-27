import React from 'react';
import styled, { css } from 'react-emotion';

const ControlLabel = styled('label')({
  flex: 1,
  display: 'flex',
  span: {
    padding: '.5em',
  },
  'input, select': {
    flex: 1,
  },
});

const InputViewForm = styled('form')({
  flex: 1,
  display: 'flex',
  flexDirection: 'column',
});

const Controls = styled('div')({
  display: 'flex',
});

const CodeTextarea = styled('textarea')({
  display: 'block',
  flex: 1,
  border: '1px solid gainsboro',
  boxShadow: 'inset gainsboro 0px 5px 5px -3px',
  fontFamily: 'fira code, menlo, monospace',
});

const InputView = ({ code, language, width, onSubmit, onChange }) => (
  <InputViewForm method="post" onSubmit={onSubmit}>
    <Controls>
      <ControlLabel>
        <span>Language</span>
        <select
          name="language"
          value={language}
          onChange={event => onChange('language', event.target.value)}
        >
          <option value="c">C</option>
          <option value="css">CSS</option>
          <option value="javascript">JavaScript</option>
          <option value="python">Python</option>
        </select>
      </ControlLabel>
      <ControlLabel>
        <span>Width</span>
        <input
          type="number"
          title="print width"
          name="width"
          value={width}
          min={0}
          style={{ width: '5em' }}
          onChange={event => onChange('width', parseInt(event.target.value, 10))}
        />
      </ControlLabel>
    </Controls>
    <CodeTextarea name="content" value={code} onChange={event => onChange('code', event.target.value)} />
    <button type="submit">Nicen my code!</button>
  </InputViewForm>
);

export default InputView;
