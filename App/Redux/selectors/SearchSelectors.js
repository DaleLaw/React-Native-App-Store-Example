import { createSelector } from 'reselect'

export const selectSearchDomain = () => (state) => state.search

export const makeSelectSearchKeyword = () => createSelector(
  selectSearchDomain(),
  (substate) => substate.keyword
)

export default selectSearchDomain
