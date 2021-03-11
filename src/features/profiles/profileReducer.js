import { LISTEN_TO_CURRENT_USER_PROFILE } from './profileConstants';

const initialState = {
  currentUserProfile: null,
};

export const profileReducer = (state = initialState, action) => {
  switch (action.type) {
    case LISTEN_TO_CURRENT_USER_PROFILE:
      return {
        ...state,
        currentUserProfile: action.payload,
      };

    default:
      return state;
  }
};
