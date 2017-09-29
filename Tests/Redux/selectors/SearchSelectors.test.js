import Immutable from 'seamless-immutable'
import { selectSearchDomain, makeSelectSearch, makeSelectSearchKeyword } from '../../../App/Redux/selectors/SearchSelectors'

describe('SearchSelectors', () => {
  const globalState = Immutable({
    search: {
      keyword: 'test',
    },
  })

  it('should select search', () => {
    const selector = selectSearchDomain()
    expect(selector(globalState)).toEqual(globalState.search)
  })

  it('should select search keyword', () => {
    const selector = makeSelectSearchKeyword()
    expect(selector(globalState)).toEqual('test')
  })
})
