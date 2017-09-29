import Immutable from 'seamless-immutable'
import { RESET, FETCH_FREE_APP_PAGE, FETCH_FREE_APP_PAGE_SUCCESS, FETCH_FREE_APP_PAGE_FAILED } from '../actions'
import FetchState from '../../Constants/FetchState'

export const initialState = Immutable({
  all: {},
  currentPage: 0,
  pages: {},
})
export const freeApps = (state = initialState, action = {}) => {
  switch (action.type) {
    case RESET:
      return initialState
    case FETCH_FREE_APP_PAGE:
      return state
        .set('currentPage', action.page)
        .setIn(['pages', action.page], {
          ids: [],
          fetchState: FetchState.IN_PROGRESS,
          error: null,
        })
    case FETCH_FREE_APP_PAGE_SUCCESS:
      return state
        .set('all', Immutable.merge(state.all, action.apps))
        .setIn(['pages', action.page], {
          ids: action.ids,
          fetchState: FetchState.SUCCESS,
          error: null,
        })
    case FETCH_FREE_APP_PAGE_FAILED:
      return state
        .setIn(['pages', action.page], {
          ids: [],
          fetchState: FetchState.FAILED,
          error: action.error,
        })
    default:
      return state
  }
}

export default freeApps
