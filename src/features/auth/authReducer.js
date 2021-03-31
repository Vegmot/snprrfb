import { SIGN_IN_USER, SIGN_OUT_USER } from './authConstants'
import { LOCATION_CHANGE } from 'connected-react-router'

const initialState = {
  authenticated: false,
  currentUser: null,
  prevLocation: null,
  currentLocation: null,
}

export const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case SIGN_IN_USER:
      return {
        ...state,
        authenticated: true,
        currentUser: {
          email: action.payload.email,
          photoURL: action.payload.photoURL,
          uid: action.payload.uid,
          displayName: action.payload.displayName,
          providerId: action.payload.providerData[0].providerId,
        },
      }

    case SIGN_OUT_USER:
      return {
        ...state,
        authenticated: false,
        currentUser: null,
      }

    case LOCATION_CHANGE:
      return {
        ...state,
        prevLocation: state.currentLocation,
        currentLocation: action.payload.location,
      }

    default:
      return state
  }
}
