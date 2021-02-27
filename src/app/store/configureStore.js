import { createStore } from 'redux';
import testReducer from '../../features/sandbox/testReducer';

const configureStore = () => {
  return createStore(testReducer);
};

export default configureStore;
