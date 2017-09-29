import Immutable from 'seamless-immutable'
import { initialState, freeApps } from '../../../App/Redux/reducers/FreeAppsReducer'
import { FETCH_FREE_APP_PAGE, FETCH_FREE_APP_PAGE_SUCCESS, FETCH_FREE_APP_PAGE_FAILED, RESET } from '../../../App/Redux/actions'
import FetchState from '../../../App/Constants/FetchState'

describe('FreeAppsReducer', () => {
  const mockSuccessAction = {
    type: FETCH_FREE_APP_PAGE_SUCCESS,
    page: 1,
    apps: {
      1: { img: 'http://image', name: 'abc', category: 'Games' },
      2: { img: 'http://image2', name: 'def', category: 'Games' },
    },
    ids: ['1', '323'],
  }
  const mockFailedAction = {
    type: FETCH_FREE_APP_PAGE_FAILED,
    page: 1,
    error: 'Internal Server Error',
  }

  it('should update correctly for action FETCH_FREE_APP_PAGE', () => {
    const state1 = freeApps(initialState, { type: FETCH_FREE_APP_PAGE, page: 1 })
    expect(state1).toEqual({
      all: {},
      currentPage: 1,
      pages: {
        1: {
          ids: [],
          fetchState: FetchState.IN_PROGRESS,
          error: null,
        },
      },
    })
  })

  it('should update correctly for action FETCH_FREE_APP_PAGE_SUCCESS for page 1', () => {
    const state1 = freeApps(initialState, { type: FETCH_FREE_APP_PAGE, page: 1 })
    const state2 = freeApps(state1, mockSuccessAction)
    expect(state2).toEqual({
      all: mockSuccessAction.apps,
      currentPage: 1,
      pages: {
        1: {
          ids: mockSuccessAction.ids,
          fetchState: FetchState.SUCCESS,
          error: null,
        },
      },
    })
  })

  it('should merge all apps for action FETCH_FREE_APP_PAGE_SUCCESS after fetched page 2', () => {
    const state1 = freeApps(initialState, { type: FETCH_FREE_APP_PAGE, page: 1 })
    const state2 = freeApps(state1, mockSuccessAction)
    const state3 = freeApps(state2, { type: FETCH_FREE_APP_PAGE, page: 2 })
    const mockSuccessAction2 = {
      type: FETCH_FREE_APP_PAGE_SUCCESS,
      page: 2,
      apps: {
        3: { img: 'http://image3', name: 'ggg', category: 'Games' },
        4: { img: 'http://image4', name: 'hhh', category: 'Games' },
      },
      ids: ['3', '4'],
    }
    const state4 = freeApps(state3, mockSuccessAction2)
    expect(state4).toEqual({
      all: Immutable.merge(mockSuccessAction.apps, mockSuccessAction2.apps),
      currentPage: 2,
      pages: {
        1: {
          ids: mockSuccessAction.ids,
          fetchState: FetchState.SUCCESS,
          error: null,
        },
        2: {
          ids: mockSuccessAction2.ids,
          fetchState: FetchState.SUCCESS,
          error: null,
        },
      },
    })
  })

  it('should update correctly for action FETCH_FREE_APP_PAGE_FAILED', () => {
    const state1 = freeApps(initialState, { type: FETCH_FREE_APP_PAGE, page: 1 })
    const state2 = freeApps(state1, mockFailedAction)
    expect(state2).toEqual({
      all: {},
      currentPage: 1,
      pages: {
        1: {
          ids: [],
          fetchState: FetchState.FAILED,
          error: 'Internal Server Error',
        },
      },
    })
  })

  it('should return initial state for action REFRESH', () => {
    const state1 = freeApps(initialState, { type: FETCH_FREE_APP_PAGE, page: 1 })
    const state2 = freeApps(state1, mockSuccessAction)
    const state3 = freeApps(state2, { type: RESET })
    expect(state3).toEqual(initialState)
  })
})
