import {
  CREATE_EVENT,
  DELETE_EVENT,
  UPDATE_EVENT,
  FETCH_EVENTS,
  LISTEN_TO_EVENT_CHAT,
} from './eventContstants'
import {
  asyncActionError,
  asyncActionFinish,
  asyncActionStart,
} from '../../app/async/asyncReducer'
import { fetchSampleData } from '../../app/api/mockAPI'

export const loadEvents = () => {
  return async function (dispatch) {
    dispatch(asyncActionStart())
    try {
      const events = await fetchSampleData()
      dispatch({ type: FETCH_EVENTS, payload: events })
      dispatch(asyncActionFinish())
    } catch (error) {
      dispatch(asyncActionError(error))
    }
  }
}

export const listenToEvents = events => {
  return {
    type: FETCH_EVENTS,
    payload: events,
  }
}

export const createEvent = event => {
  return {
    type: CREATE_EVENT,
    payload: event,
  }
}

export const updateEvent = event => {
  return {
    type: UPDATE_EVENT,
    payload: event,
  }
}

export const deleteEvent = eventId => {
  return {
    type: DELETE_EVENT,
    payload: eventId,
  }
}

export const listenToEventChat = comments => {
  return {
    type: LISTEN_TO_EVENT_CHAT,
    payload: comments,
  }
}
