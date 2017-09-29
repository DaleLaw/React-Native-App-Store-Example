import { createSelector } from 'reselect'
import { makeSelectSearchKeyword } from './SearchSelectors'

export const selectFreeAppsDomain = () => (state) => state.freeApps

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

// Select free apps that filtered by search keyword
export const makeSelectFilteredFreeApps = () => createSelector(
  makeSelectAllFreeApps(),
  makeSelectSearchKeyword(),
  (allFreeApps, keyword) =>
    // filter() will only return apps that contains the keyword
    allFreeApps.filter((app) => app.name.indexOf(keyword) > -1)

)

// Select current page fetch state
export const makeSelectFreeAppsFetchState = () => createSelector(
  selectFreeAppsDomain(),
  (substate) => substate.fetchState
)

export default selectFreeAppsDomain
