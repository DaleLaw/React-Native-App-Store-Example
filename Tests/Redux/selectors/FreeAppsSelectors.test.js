import Immutable from 'seamless-immutable'
import { selectFreeAppsDomain, makeSelectAllFreeApps, makeSelectFilteredFreeApps, makeSelectFreeAppsFetchState } from '../../../App/Redux/selectors/FreeAppsSelectors'
import FetchState from '../../../App/Constants/FetchState'

describe('FreeAppsSelectors', () => {
  const globalState = Immutable({
    freeApps: {
      all: {
        1: { img: '', name: 'aaa', category: 'Games', fetchState: FetchState.SUCCESS, averageUserRating: 4, userRatingCount: 10 },
        2: { img: '', name: 'bbb', category: 'Games', fetchState: FetchState.SUCCESS, averageUserRating: 4, userRatingCount: 10 },
        3: { img: '', name: 'testccc', category: 'Games', fetchState: FetchState.SUCCESS, averageUserRating: 4, userRatingCount: 10 },
        4: { img: '', name: 'ddd', category: 'Games', fetchState: FetchState.SUCCESS, averageUserRating: 4, userRatingCount: 10 },
        5: { img: '', name: 'eeetest', category: 'Games', fetchState: FetchState.SUCCESS, averageUserRating: 4, userRatingCount: 10 },
      },
      currentPage: 2,
      ids: [1, 2, 3, 4, 5],
      fetchState: FetchState.SUCCESS,
    },
    search: {
      keyword: 'test',
    },
  })

  it('should select freeApss', () => {
    const selector = selectFreeAppsDomain()
    expect(selector(globalState)).toEqual(globalState.freeApps)
  })

  it('should select all free apps', () => {
    const selector = makeSelectAllFreeApps()
    expect(selector(globalState)).toEqual([
      { id: 1, img: '', name: 'aaa', category: 'Games', fetchState: FetchState.SUCCESS, averageUserRating: 4, userRatingCount: 10 },
      { id: 2, img: '', name: 'bbb', category: 'Games', fetchState: FetchState.SUCCESS, averageUserRating: 4, userRatingCount: 10 },
      { id: 3, img: '', name: 'testccc', category: 'Games', fetchState: FetchState.SUCCESS, averageUserRating: 4, userRatingCount: 10 },
      { id: 4, img: '', name: 'ddd', category: 'Games', fetchState: FetchState.SUCCESS, averageUserRating: 4, userRatingCount: 10 },
      { id: 5, img: '', name: 'eeetest', category: 'Games', fetchState: FetchState.SUCCESS, averageUserRating: 4, userRatingCount: 10 },
    ])
  })

  it('should select filtered free apps', () => {
    const selector = makeSelectFilteredFreeApps()
    expect(selector(globalState)).toEqual([
      { id: 3, img: '', name: 'testccc', category: 'Games', fetchState: FetchState.SUCCESS, averageUserRating: 4, userRatingCount: 10 },
      { id: 5, img: '', name: 'eeetest', category: 'Games', fetchState: FetchState.SUCCESS, averageUserRating: 4, userRatingCount: 10 },
    ])
  })

  it('should select filtered free apps (no search keyword case)', () => {
    const state = globalState.asMutable({ deep: true })
    state.search.keyword = ''
    const selector = makeSelectFilteredFreeApps()
    expect(selector(state)).toEqual([
      { id: 1, img: '', name: 'aaa', category: 'Games', fetchState: FetchState.SUCCESS, averageUserRating: 4, userRatingCount: 10 },
      { id: 2, img: '', name: 'bbb', category: 'Games', fetchState: FetchState.SUCCESS, averageUserRating: 4, userRatingCount: 10 },
      { id: 3, img: '', name: 'testccc', category: 'Games', fetchState: FetchState.SUCCESS, averageUserRating: 4, userRatingCount: 10 },
      { id: 4, img: '', name: 'ddd', category: 'Games', fetchState: FetchState.SUCCESS, averageUserRating: 4, userRatingCount: 10 },
      { id: 5, img: '', name: 'eeetest', category: 'Games', fetchState: FetchState.SUCCESS, averageUserRating: 4, userRatingCount: 10 },
    ])
  })

  it('should select filtered free apps (no match case)', () => {
    const state = globalState.asMutable({ deep: true })
    state.search.keyword = 'noMatch'
    const selector = makeSelectFilteredFreeApps()
    expect(selector(state)).toEqual([])
  })

  it('should select current page fetch state', () => {
    const selector = makeSelectFreeAppsFetchState()
    expect(selector(globalState)).toEqual(FetchState.SUCCESS)
  })
})
