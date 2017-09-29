import _ from 'lodash'
import { createSelector } from 'reselect'
import { makeSelectSearchKeyword } from './SearchSelectors'

export const selectFreeAppsDomain = () => (state) => state.freeApps

// Select all free apps from the Redux Store
export const makeSelectAllFreeApps = () => createSelector(
  selectFreeAppsDomain(),
  (freeApps) => {
    const { all, currentPage, pages } = freeApps
    // We use _.range() to loop from 1 to currentPage
    // then use flatMap() to get ids array from each page and flatten them into single array
    // then use map() to get the app object, and add the id attribute
    return _.flatMap(_.range(1, currentPage + 1),
      (i) => pages[i].ids)
      .map((id) => ({
        ...all[id],
        id,
      }))
  }
)

// Select free apps that filtered by search keyword
export const makeSelectFilteredFreeApps = () => createSelector(
  makeSelectAllFreeApps(),
  makeSelectSearchKeyword(),
  (allFreeApps, keyword) =>
    // filter() will only return apps that contains the keyword
    allFreeApps.filter((app) => app.name.indexOf(keyword) > -1)

)

// Select current page fetch state
export const makeSelectPageFetchState = () => createSelector(
  selectFreeAppsDomain(),
  (substate) => substate.pages[substate.currentPage].fetchState
)

export default selectFreeAppsDomain
