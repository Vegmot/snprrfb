import {
  CREATE_EVENT,
  UPDATE_EVENT,
  DELETE_EVENT,
  FETCH_EVENTS,
  LISTEN_TO_EVENT_CHAT,
  CLEAR_COMMENTS,
} from './eventContstants'

const initialState = {
  events: [],
  comments: [],
}

export const eventReducer = (state = initialState, action) => {
  switch (action.type) {
    case CREATE_EVENT:
      return {
        ...state,
        events: [...state.events, action.payload],
      }

    case UPDATE_EVENT:
      return {
        ...state,
        events: [
          ...state.events.filter(event => event.id !== action.payload.id),
          action.payload,
        ], // here, [...filter] part means that the array has to contain all the events except one thas is being modified/updated
        // and then pushing the updated one into this array
      }

    case DELETE_EVENT:
      return {
        ...state,
        events: [
          ...state.events.filter(event => event.id !== action.payload), // in the action file, deleteEvent function is already returning eventId, so action.payload is eventId here
        ],
      }

    case FETCH_EVENTS:
      return {
        ...state,
        events: action.payload,
      }

    case LISTEN_TO_EVENT_CHAT:
      return {
        ...state,
        comments: action.payload,
      }

    case CLEAR_COMMENTS:
      return {
        ...state,
        comments: [],
      }

    default:
      return state
  }
}
