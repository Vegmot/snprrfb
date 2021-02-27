import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Button } from 'semantic-ui-react';
import { INCREMENT_COUNTER, DECREMENT_COUNTER } from './testReducer';

const Sandbox = () => {
  const data = useSelector(state => state.data);
  const dispatch = useDispatch();
  return (
    <>
      <h1>Test</h1>
      <h3>Here goes the data: {data}</h3>
      <Button
        content='Increment'
        color='green'
        onClick={() => dispatch({ type: INCREMENT_COUNTER })}
      />
      <Button
        content='Decrement'
        color='red'
        onClick={() => dispatch({ type: DECREMENT_COUNTER })}
      />
    </>
  );
};

export default Sandbox;
