import React from 'react';
import styled from 'react-emotion';
import { Flex } from 'reflexbox';
import Editor from './Editor';


const InputViewForm = styled('form')({
  flex: 1,
  display: 'flex',
  flexDirection: 'column',
});

const Controls = styled('div')({
  display: 'flex',
  flexDirection: 'column',
  minWidth: '12em',
});

const HandlersList = styled('ul')({
  listStyleType: 'none',
  padding: 0,
  margin: 0,
  flex: 1,
});

const HandlerListItem = styled('li')({
  padding: '.5em',
  margin: 0,
  cursor: 'pointer',
  overflowY: 'auto',
  '.name': {
    display: 'block',
    fontWeight: 'bold',
  },
  '.language': {
    display: 'block',
    opacity: 0.75,
  },
  '&.active': {
    background: 'gainsboro',
  },
  ':hover': {
    background: 'gainsboro',
    color: '#2d4d4a',
  },
});

const InputView = ({ code, handlers, handler, width, onSubmit, onChange }) => (
  <InputViewForm method="post" onSubmit={onSubmit}>
    <Flex auto>
      <Controls>
        <Flex>
          <Flex auto style={{ padding: '.5em' }}>
            Width
          </Flex>
          <input
            type="number"
            title="print width"
            name="width"
            value={width}
            min={0}
            style={{ width: '5em' }}
            onChange={event => onChange('width', parseInt(event.target.value, 10))}
          />
        </Flex>
        <HandlersList>
          {handlers.map(h => (
            <HandlerListItem
              key={h.name}
              className={handler && h.name === handler.name ? 'active' : ''}
              tabIndex={0}
              onClick={() => onChange('handler', h)}
            >
              <span className="name">{h.name}</span>
              <span className="language">{h.language}</span>
            </HandlerListItem>
          ))}
        </HandlersList>
      </Controls>
      <Editor code={code} onChange={newCode => onChange('code', newCode)} handler={handler} />
    </Flex>
    <button type="submit">Nicen my code!</button>
  </InputViewForm>
);

export default InputView;
