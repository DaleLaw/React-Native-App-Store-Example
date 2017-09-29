import Immutable from 'seamless-immutable'
import { initialState, recommendations } from '../../../App/Redux/reducers/RecommendationsReducer'
import { FETCH_RECOMMENDATIONS, FETCH_RECOMMENDATIONS_SUCCESS, FETCH_RECOMMENDATIONS_FAILED, RESET } from '../../../App/Redux/actions'
import FetchState from '../../../App/Constants/FetchState'

describe('RecommendationsReducer', () => {
  const mockSuccessAction = {
    type: FETCH_RECOMMENDATIONS_SUCCESS,
    apps: {
      1: { img: 'http://image', name: 'abc', category: 'Games' },
      323: { img: 'http://image2', name: 'def', category: 'Games' },
    },
    ids: ['1', '323'],
  }
  const mockFailedAction = {
    type: FETCH_RECOMMENDATIONS_FAILED,
    error: 'Internal Server Error',
  }

  it('should update correctly for action FETCH_RECOMMENDATIONS', () => {
    const state1 = recommendations(initialState, { type: FETCH_RECOMMENDATIONS })
    expect(state1.fetchState).toEqual(FetchState.IN_PROGRESS)
  })

  it('should update correctly for action FETCH_RECOMMENDATIONS_SUCCESS', () => {
    const state1 = recommendations(initialState, mockSuccessAction)
    expect(state1).toEqual({
      all: mockSuccessAction.apps,
      ids: mockSuccessAction.ids,
      fetchState: FetchState.SUCCESS,
      error: null,
    })
  })

  it('should update correctly for action FETCH_RECOMMENDATIONS_FAILED', () => {
    const state1 = recommendations(initialState, mockSuccessAction)

    const state2 = recommendations(state1, mockFailedAction)
    expect(state2).toEqual({
      all: {},
      ids: [],
      fetchState: FetchState.FAILED,
      error: 'Internal Server Error',
    })
  })

  it('should return initial state for action RESET', () => {
    const state1 = recommendations(initialState, { type: FETCH_RECOMMENDATIONS, page: 1 })
    const state2 = recommendations(state1, mockSuccessAction)
    const state3 = recommendations(state2, { type: RESET })
    expect(state3).toEqual(initialState)
  })
})
