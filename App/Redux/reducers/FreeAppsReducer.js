import Immutable from 'seamless-immutable'
import {
  RESET,
  FETCH_TOP_FREE_APPS,
  FETCH_TOP_FREE_APPS_SUCCESS,
  FETCH_TOP_FREE_APPS_FAILED,
  FETCH_APP_DETAILS,
  FETCH_APP_DETAILS_SUCCESS,
  FETCH_APP_DETAILS_FAILED,
  LOAD_NEXT_PAGE,
} from '../actions'
import FetchState from '../../Constants/FetchState'

export const initialState = Immutable({
  all: {},
  currentPage: 0,
  ids: [],
  fetchState: FetchState.NOT_FETCHED,
  error: null,
})
export const freeApps = (state = initialState, action = {}) => {
  switch (action.type) {
    case RESET:
      return initialState
    case FETCH_TOP_FREE_APPS:
      return state
        .set('fetchState', FetchState.IN_PROGRESS)
    case FETCH_TOP_FREE_APPS_SUCCESS:
      return state
        .set('all', action.apps)
        .set('ids', action.ids)
        .set('fetchState', FetchState.SUCCESS)
    case FETCH_TOP_FREE_APPS_FAILED:
      return state
        .set('fetchState', FetchState.FAILED)
        .set('error', action.error)
    case FETCH_APP_DETAILS:
      return state
        .setIn(['all', action.appId, 'fetchState'], FetchState.IN_PROGRESS)
    case FETCH_APP_DETAILS_SUCCESS:
      return state
        .setIn(['all', action.appId, 'fetchState'], FetchState.SUCCESS)
        .setIn(['all', action.appId, 'averageUserRating'], action.details.averageUserRating)
        .setIn(['all', action.appId, 'userRatingCount'], action.details.userRatingCount)
    case FETCH_APP_DETAILS_FAILED:
      return state
        .setIn(['all', action.appId, 'fetchState'], FetchState.FAILED)
        .setIn(['all', action.appId, 'error'], action.error)
    case LOAD_NEXT_PAGE:
      return state
        .set('currentPage', state.currentPage + 1)
    default:
      return state
  }
}

export default freeApps
