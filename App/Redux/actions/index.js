// Actions
export const INIT_APP_LIST = 'app/INIT_APP_LIST'
export const FETCH_TOP_FREE_APPS_SUCCESS = 'app/FETCH_TOP_FREE_APPS_SUCCESS'
export const FETCH_TOP_FREE_APPS_FAILED = 'app/FETCH_TOP_FREE_APPS_FAILED'
export const FETCH_APP_DETAILS_SUCCESS = 'app/FETCH_APP_DETAILS_SUCCESS'
export const FETCH_APP_DETAILS_FAILED = 'app/FETCH_APP_DETAILS_FAILED'
export const FETCH_RECOMMENDATIONS = 'app/FETCH_RECOMMENDATIONS'
export const FETCH_RECOMMENDATIONS_SUCCESS = 'app/FETCH_RECOMMENDATIONS_SUCCESS'
export const FETCH_RECOMMENDATIONS_FAILED = 'app/FETCH_RECOMMENDATIONS_FAILED'
export const LOAD_NEXT_PAGE = 'app/LOAD_NEXT_PAGE'
export const SEARCH = 'app/SEARCH'
export const RESET = 'app/RESET'

// Action creators
export const fetchTopFreeAppsSuccess = (apps, ids) => ({
  type: FETCH_TOP_FREE_APPS_SUCCESS,
  apps,
  ids,
})

export const fetchTopFreeAppsFailed = (error) => ({
  type: FETCH_TOP_FREE_APPS_FAILED,
  error,
})

export const fetchAppDetailsSuccess = (appId, details) => ({
  type: FETCH_APP_DETAILS_SUCCESS,
  appId,
  details,
})

export const fetchAppDetailsFailed = (appId, error) => ({
  type: FETCH_APP_DETAILS_FAILED,
  appId,
  error,
})

export const fetchRecommendations = () => ({
  type: FETCH_RECOMMENDATIONS,
})

export const fetchRecommendationsSuccess = (apps, ids) => ({
  type: FETCH_RECOMMENDATIONS_SUCCESS,
  apps,
  ids,
})

export const fetchRecommendationsFailed = (error) => ({
  type: FETCH_RECOMMENDATIONS_SUCCESS,
  error,
})

export const loadNextPage = (nextPage) => ({
  type: LOAD_NEXT_PAGE,
  nextPage,
})

export const search = (keyword) => ({
  type: SEARCH,
  keyword,
})

export const reset = () => ({
  type: RESET,
})
