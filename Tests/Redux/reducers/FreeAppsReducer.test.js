import Immutable from 'seamless-immutable'
import { initialState, freeApps } from '../../../App/Redux/reducers/FreeAppsReducer'
import {
  RESET,
  FETCH_TOP_FREE_APPS,
  FETCH_TOP_FREE_APPS_SUCCESS,
  FETCH_TOP_FREE_APPS_FAILED,
  FETCH_APP_DETAILS,
  FETCH_APP_DETAILS_SUCCESS,
  FETCH_APP_DETAILS_FAILED,
  LOAD_NEXT_PAGE,
} from '../../../App/Redux/actions'
import FetchState from '../../../App/Constants/FetchState'

describe('FreeAppsReducer', () => {
  const mockFetchTopFreeAppsSuccess = {
    type: FETCH_TOP_FREE_APPS_SUCCESS,
    apps: {
      1: { img: 'http://image', name: 'abc', category: 'Games', fetchState: FetchState.NOT_FETCHED, error: null },
      2: { img: 'http://image2', name: 'def', category: 'Games', fetchState: FetchState.NOT_FETCHED, error: null },
    },
    ids: ['1', '2'],
  }
  const mockFetchTopFreeAppsFailed = {
    type: FETCH_TOP_FREE_APPS_FAILED,
    error: 'Internal Server Error',
  }
  const mockAppDetailsSuccess = {
    type: FETCH_APP_DETAILS_SUCCESS,
    appId: 1,
    details: {
      averageUserRating: 4.5,
      userRatingCount: 10,
    },
  }
  const mockAppDetailsFailed = {
    type: FETCH_APP_DETAILS_FAILED,
    appId: 1,
    error: 'Internal Server Error',
  }

  it('should update correctly for action FETCH_TOP_FREE_APPS', () => {
    const state1 = freeApps(initialState, { type: FETCH_TOP_FREE_APPS })
    expect(state1).toEqual({
      all: {},
      currentPage: 0,
      ids: [],
      fetchState: FetchState.IN_PROGRESS,
      error: null,
    })
  })

  it('should update correctly for action FETCH_TOP_FREE_APPS_SUCCESS', () => {
    const state1 = freeApps(initialState, { type: FETCH_TOP_FREE_APPS })
    const state2 = freeApps(state1, mockFetchTopFreeAppsSuccess)
    expect(state2).toEqual({
      all: mockFetchTopFreeAppsSuccess.apps,
      currentPage: 0,
      ids: mockFetchTopFreeAppsSuccess.ids,
      fetchState: FetchState.SUCCESS,
      error: null,
    })
  })

  it('should merge all apps for action FETCH_TOP_FREE_APPS_FAILED', () => {
    const state1 = freeApps(initialState, { type: FETCH_TOP_FREE_APPS })
    const state2 = freeApps(state1, mockFetchTopFreeAppsFailed)
    expect(state2).toEqual({
      all: {},
      currentPage: 0,
      ids: [],
      fetchState: FetchState.FAILED,
      error: 'Internal Server Error',
    })
  })

  it('should update correctly for action FETCH_APP_DETAILS', () => {
    const state1 = freeApps(initialState, { type: FETCH_TOP_FREE_APPS })
    const state2 = freeApps(state1, mockFetchTopFreeAppsSuccess)
    const state3 = freeApps(state2, { type: FETCH_APP_DETAILS, appId: 1 })
    expect(state3.all[1]).toEqual({ img: 'http://image', name: 'abc', category: 'Games', fetchState: FetchState.IN_PROGRESS, error: null })
  })

  it('should update correctly for action FETCH_APP_DETAILS_SUCCESS', () => {
    const state1 = freeApps(initialState, { type: FETCH_TOP_FREE_APPS })
    const state2 = freeApps(state1, mockFetchTopFreeAppsSuccess)
    const state3 = freeApps(state2, { type: FETCH_APP_DETAILS, appId: 1 })
    const state4 = freeApps(state3, mockAppDetailsSuccess)
    expect(state4.all[1]).toEqual({
      ...state4.all[1],
      averageUserRatings: mockAppDetailsSuccess.details.averageUserRatings,
      userRatingCount: mockAppDetailsSuccess.details.userRatingCount,
      fetchState: FetchState.SUCCESS,
      error: null,
    })
  })

  it('should merge all apps for action FETCH_APP_DETAILS_FAILED', () => {
    const state1 = freeApps(initialState, { type: FETCH_TOP_FREE_APPS })
    const state2 = freeApps(state1, mockFetchTopFreeAppsSuccess)
    const state3 = freeApps(state2, { type: FETCH_APP_DETAILS, appId: 1 })
    const state4 = freeApps(state3, mockAppDetailsFailed)
    expect(state4.all[1]).toEqual({
      ...state4.all[1],
      fetchState: FetchState.FAILED,
      error: 'Internal Server Error',
    })
  })

  it('should update correctly for action LOAD_NEXT_PAGE', () => {
    const state1 = freeApps(initialState, { type: LOAD_NEXT_PAGE, page: 1 })
    expect(state1.currentPage).toEqual(1)
  })

  it('should return initial state for action REFRESH', () => {
    const state1 = freeApps(initialState, { type: FETCH_TOP_FREE_APPS, page: 1 })
    const state2 = freeApps(state1, mockFetchTopFreeAppsSuccess)
    const state3 = freeApps(state2, { type: RESET })
    expect(state3).toEqual(initialState)
  })
})
