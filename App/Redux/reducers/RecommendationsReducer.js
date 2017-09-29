import Immutable from 'seamless-immutable'
import { RESET, FETCH_RECOMMENDATIONS, FETCH_RECOMMENDATIONS_SUCCESS, FETCH_RECOMMENDATIONS_FAILED } from '../actions'
import FetchState from '../../Constants/FetchState'

export const initialState = Immutable({
  all: {},
  ids: [],
  fetchState: FetchState.NOT_FETCHED, // either be 'NOT_FETCHED', 'IN_PROGRESS', 'SUCCESS', 'ERROR'
  error: null,
})
export const recommendations = (state = initialState, action = {}) => {
  switch (action.type) {
    case RESET:
      return initialState
    case FETCH_RECOMMENDATIONS:
      // clear all the saved data,
      // and set the fetch state as in progress
      return state
        .set('fetchState', FetchState.IN_PROGRESS)
    case FETCH_RECOMMENDATIONS_SUCCESS:
      return state
        .set('all', action.apps)
        .set('ids', action.ids)
        .set('fetchState', FetchState.SUCCESS)
    case FETCH_RECOMMENDATIONS_FAILED:
      return initialState
        .set('fetchState', FetchState.FAILED)
        .set('error', action.error)
    default:
      return state
  }
}

export default recommendations
