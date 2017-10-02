import _ from 'lodash'
import { createSelector } from 'reselect'
import { makeSelectSearchKeyword } from './SearchSelectors'

export const selectRecommendationsDomain = () => (state) => state.recommendations

// Select all recommendations from the Redux Store
export const makeSelectAllRecommendations = () => createSelector(
  selectRecommendationsDomain(),
  (recommendations) => {
    const { all, ids } = recommendations
    // We use map() to get the app object, and add the id attribute
    return ids.map((id) => ({
      ...all[id],
      id,
    }))
  }
)

// Select recommendations that filtered by search keyword
export const makeSelectFilteredRecommendations = () => createSelector(
  makeSelectAllRecommendations(),
  makeSelectSearchKeyword(),
  (allRecommendations, keyword) =>
    // filter() will only return apps that contains the keyword
    allRecommendations.filter((app) => app.name.indexOf(keyword) > -1)

)

// Select fetch state
export const makeSelectRecommendationsFetchState = () => createSelector(
  selectRecommendationsDomain(),
  (substate) => substate.fetchState
)

export default selectRecommendationsDomain
