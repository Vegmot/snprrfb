import {
  asyncActionError,
  asyncActionFinish,
  asyncActionStart,
} from '../../app/async/asyncReducer';
import { delay } from '../../app/common/util/util';

const INCREMENT_COUNTER = 'INCREMENT_COUNTER';
const DECREMENT_COUNTER = 'DECREMENT_COUNTER';

export const increment = amount => {
  return async dispatch => {
    dispatch(asyncActionStart());
    try {
      await delay(1000);
      dispatch({ type: INCREMENT_COUNTER, payload: amount });
      dispatch(asyncActionFinish());
    } catch (error) {
      dispatch(asyncActionError(error));
    }
  };
};

export const decrement = amount => {
  return async dispatch => {
    dispatch(asyncActionStart());
    try {
      await delay(1000);
      dispatch({ type: DECREMENT_COUNTER, payload: amount });
      dispatch(asyncActionFinish());
    } catch (error) {
      dispatch(asyncActionError(error));
    }
  };
};

const initialState = {
  data: 64,
};

const testReducer = (state = initialState, action) => {
  switch (action.type) {
    case INCREMENT_COUNTER:
      return {
        ...state,
        data: state.data + action.payload,
      };
    case DECREMENT_COUNTER:
      return {
        ...state,
        data: state.data - action.payload,
      };
    default:
      return state;
  }
};

export default testReducer;
