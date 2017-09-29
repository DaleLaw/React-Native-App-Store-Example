import Immutable from 'seamless-immutable'
import { SEARCH } from '../actions'

export const initialState = Immutable({
  keyword: '',
})
export const search = (state = initialState, action = {}) => {
  switch (action.type) {
    case SEARCH:
      return initialState
        .set('keyword', action.keyword)
    default:
      return state
  }
}

export default search
