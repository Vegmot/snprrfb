import {
  LISTEN_TO_CURRENT_USER_PROFILE,
  LISTEN_TO_FOLLOWERS,
  LISTEN_TO_FOLLOWINGS,
  LISTEN_TO_SELECTED_USER_PROFILE,
  LISTEN_TO_USER_EVENTS,
  LISTEN_TO_USER_PHOTOS,
} from './profileConstants'

const initialState = {
  currentUserProfile: null,
  selectedUserProfile: null,
  photos: [],
  profileEvents: [],
  followers: [],
  followings: [],
}

export const profileReducer = (state = initialState, action) => {
  switch (action.type) {
    case LISTEN_TO_CURRENT_USER_PROFILE:
      return {
        ...state,
        currentUserProfile: action.payload,
      }

    case LISTEN_TO_SELECTED_USER_PROFILE:
      return {
        ...state,
        selectedUserProfile: action.payload,
      }

    case LISTEN_TO_USER_PHOTOS:
      return {
        ...state,
        photos: action.payload,
      }

    case LISTEN_TO_USER_EVENTS:
      return {
        ...state,
        profileEvents: action.payload,
      }

    case LISTEN_TO_FOLLOWERS:
      return {
        ...state,
        followers: action.payload,
      }

    case LISTEN_TO_FOLLOWINGS:
      return {
        ...state,
        followings: action.payload,
      }

    default:
      return state
  }
}
