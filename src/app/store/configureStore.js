import { createStore } from 'redux';
import { devToolsEnhancer } from 'redux-devtools-extension';
import testReducer from '../../features/sandbox/testReducer';

const configureStore = () => {
  return createStore(testReducer, devToolsEnhancer());
};

export default configureStore;
