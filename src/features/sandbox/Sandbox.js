import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Button } from 'semantic-ui-react';
import { increment, decrement } from './testReducer';

const Sandbox = () => {
  const data = useSelector(state => state.test.data);
  const dispatch = useDispatch();
  return (
    <>
      <h1>Test</h1>
      <h3>Here goes the data: {data}</h3>
      <Button
        content='Increment'
        color='green'
        onClick={() => dispatch(increment(10))}
      />
      <Button
        content='Decrement'
        color='red'
        onClick={() => dispatch(decrement(5))}
      />
    </>
  );
};

export default Sandbox;
