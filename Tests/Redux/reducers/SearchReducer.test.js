import { initialState, search } from '../../../App/Redux/reducers/SearchReducer'
import { SEARCH } from '../../../App/Redux/actions'

describe('FreeAppsReducer', () => {
  it('should update correctly for action SEARCH', () => {
    const state1 = search(initialState, { type: SEARCH, keyword: 'abc' })
    expect(state1).toEqual({
      keyword: 'abc',
    })
  })
})
