import { createSelector } from 'reselect'
import { makeSelectSearchKeyword } from './SearchSelectors'

const PAGE_SIZE = 10

export const selectFreeAppsDomain = () => (state) => state.freeApps

export const makeSelectCurrentPage = () => createSelector(
  selectFreeAppsDomain(),
  (state) => state.currentPage
)

// Select all free apps from the Redux Store
export const makeSelectAllFreeApps = () => createSelector(
  selectFreeAppsDomain(),
  (freeApps) => {
    const { all, ids } = freeApps
    // We use map() to get the app object, and add the id attribute
    return ids.map((id) => ({
      ...all[id],
      id,
    }))
  }
)

// Seelct free apps in all loaded pages
export const makeSelectPagesFreeApps = () => createSelector(
  selectFreeAppsDomain(),
  (freeApps) => {
    const { all, ids, currentPage } = freeApps
    const pagesIds = ids.slice(0, (currentPage + 1) * PAGE_SIZE)
    // We use map() to get the app object, and add the id attribute
    return pagesIds.map((id) => ({
      ...all[id],
      id,
    }))
  }
)

// Select free apps that filtered by search keyword
export const makeSelectFilteredFreeApps = () => createSelector(
  makeSelectPagesFreeApps(),
  makeSelectSearchKeyword(),
  (allFreeApps, keyword) =>
    // filter() will only return apps that contains the keyword
    allFreeApps.filter((app) => app.name.toLowerCase().indexOf(keyword.toLowerCase()) > -1)

)

// Select current page fetch state
export const makeSelectFreeAppsFetchState = () => createSelector(
  selectFreeAppsDomain(),
  (substate) => substate.fetchState
)

export const makeSelectCurrentPageAppIds = () => createSelector(
  selectFreeAppsDomain(),
  makeSelectCurrentPage(),
  (state, currentPage) => state.ids.slice(currentPage * PAGE_SIZE, (currentPage + 1) * PAGE_SIZE)
)

export default selectFreeAppsDomain
