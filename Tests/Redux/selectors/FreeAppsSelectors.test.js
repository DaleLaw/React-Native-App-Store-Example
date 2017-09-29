import Immutable from 'seamless-immutable'
import { selectFreeAppsDomain, makeSelectAllFreeApps, makeSelectFilteredFreeApps, makeSelectPageFetchState } from '../../../App/Redux/selectors/FreeAppsSelectors'
import FetchState from '../../../App/Constants/FetchState'

describe('FreeAppsSelectors', () => {
  const globalState = Immutable({
    freeApps: {
      all: {
        1: { img: '', name: 'aaa', category: 'Games' },
        2: { img: '', name: 'bbb', category: 'Games' },
        3: { img: '', name: 'testccc', category: 'Games' },
        4: { img: '', name: 'ddd', category: 'Games' },
        5: { img: '', name: 'eeetest', category: 'Games' },
      },
      currentPage: 2,
      pages: {
        1: { ids: [1, 2], fetchState: FetchState.SUCCESS, error: null },
        2: { ids: [3, 4, 5], fetchState: FetchState.SUCCESS, error: null },
      },
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
      { id: 1, img: '', name: 'aaa', category: 'Games' },
      { id: 2, img: '', name: 'bbb', category: 'Games' },
      { id: 3, img: '', name: 'testccc', category: 'Games' },
      { id: 4, img: '', name: 'ddd', category: 'Games' },
      { id: 5, img: '', name: 'eeetest', category: 'Games' },
    ])
  })

  it('should select filtered free apps', () => {
    const selector = makeSelectFilteredFreeApps()
    expect(selector(globalState)).toEqual([
      { id: 3, img: '', name: 'testccc', category: 'Games' },
      { id: 5, img: '', name: 'eeetest', category: 'Games' },
    ])
  })

  it('should select filtered free apps (no search keyword case)', () => {
    const state = globalState.asMutable({ deep: true })
    state.search.keyword = ''
    const selector = makeSelectFilteredFreeApps()
    expect(selector(state)).toEqual([
      { id: 1, img: '', name: 'aaa', category: 'Games' },
      { id: 2, img: '', name: 'bbb', category: 'Games' },
      { id: 3, img: '', name: 'testccc', category: 'Games' },
      { id: 4, img: '', name: 'ddd', category: 'Games' },
      { id: 5, img: '', name: 'eeetest', category: 'Games' },
    ])
  })

  it('should select filtered free apps (no match case)', () => {
    const state = globalState.asMutable({ deep: true })
    state.search.keyword = 'noMatch'
    const selector = makeSelectFilteredFreeApps()
    expect(selector(state)).toEqual([])
  })

  it('should select current page fetch state', () => {
    const selector = makeSelectPageFetchState()
    expect(selector(globalState)).toEqual(FetchState.SUCCESS)
  })
})
