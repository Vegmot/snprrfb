import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Button } from 'semantic-ui-react';
import { openModal } from '../../app/common/modals/modalReducer';
import { increment, decrement } from './testReducer';

const Sandbox = () => {
  const data = useSelector(state => state.test.data);
  const [target, setTarget] = useState(null);
  const { loading } = useSelector(state => state.async);
  const dispatch = useDispatch();

  return (
    <>
      <h1>Test</h1>
      <h3>Here goes the data: {data}</h3>
      <Button
        name='increment'
        loading={loading && target === 'increment'}
        content='Increment'
        color='green'
        onClick={e => {
          dispatch(increment(10));
          setTarget(e.target.name);
        }}
      />
      <Button
        name='decrement'
        loading={loading && target === 'decrement'}
        content='Decrement'
        color='red'
        onClick={e => {
          dispatch(decrement(5));
          setTarget(e.target.name);
        }}
      />
      <Button
        content='Open modal'
        color='teal'
        onClick={() =>
          dispatch(openModal({ modalType: 'TestModal', modalProps: { data } }))
        }
      />
    </>
  );
};

export default Sandbox;
