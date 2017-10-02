import Immutable from 'seamless-immutable'
import { selectRecommendationsDomain, makeSelectAllRecommendations, makeSelectFilteredRecommendations, makeSelectRecommendationsFetchState } from '../../../App/Redux/selectors/RecommendationsSelectors'
import FetchState from '../../../App/Constants/FetchState'

describe('RecommendationsSelectors', () => {
  const globalState = Immutable({
    recommendations: {
      all: {
        1: { img: '', name: 'aaa', category: 'Games' },
        2: { img: '', name: 'bbb', category: 'Games' },
        3: { img: '', name: 'testccc', category: 'Games' },
        4: { img: '', name: 'ddd', category: 'Games' },
        5: { img: '', name: 'eeetest', category: 'Games' },
      },
      ids: [1, 2, 3, 4, 5],
      fetchState: FetchState.SUCCESS,
    },
    search: {
      keyword: 'test',
    },
  })

  it('should select recommendations', () => {
    const selector = selectRecommendationsDomain()
    expect(selector(globalState)).toEqual(globalState.recommendations)
  })

  it('should select all free apps', () => {
    const selector = makeSelectAllRecommendations()
    expect(selector(globalState)).toEqual([
      { id: 1, img: '', name: 'aaa', category: 'Games' },
      { id: 2, img: '', name: 'bbb', category: 'Games' },
      { id: 3, img: '', name: 'testccc', category: 'Games' },
      { id: 4, img: '', name: 'ddd', category: 'Games' },
      { id: 5, img: '', name: 'eeetest', category: 'Games' },
    ])
  })

  it('should select filtered free apps', () => {
    const selector = makeSelectFilteredRecommendations()
    expect(selector(globalState)).toEqual([
      { id: 3, img: '', name: 'testccc', category: 'Games' },
      { id: 5, img: '', name: 'eeetest', category: 'Games' },
    ])
  })

  it('should select filtered free apps (no search keyword case)', () => {
    const state = globalState.asMutable({ deep: true })
    state.search.keyword = ''
    const selector = makeSelectFilteredRecommendations()
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
    const selector = makeSelectFilteredRecommendations()
    expect(selector(state)).toEqual([])
  })

  it('should select fetch state', () => {
    const selector = makeSelectRecommendationsFetchState()
    expect(selector(globalState)).toEqual(FetchState.SUCCESS)
  })
})
