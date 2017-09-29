// Actions
export const FETCH_FREE_APP_PAGE = 'app/FETCH_FREE_APP_PAGE'
export const FETCH_FREE_APP_PAGE_SUCCESS = 'app/FETCH_FREE_APP_PAGE_SUCCESS'
export const FETCH_FREE_APP_PAGE_FAILED = 'app/FETCH_FREE_APP_PAGE_FAILED'
export const FETCH_RECOMMENDATIONS = 'app/FETCH_RECOMMENDATIONS'
export const FETCH_RECOMMENDATIONS_SUCCESS = 'app/FETCH_RECOMMENDATIONS_SUCCESS'
export const FETCH_RECOMMENDATIONS_FAILED = 'app/FETCH_RECOMMENDATIONS_FAILED'
export const SEARCH = 'app/SEARCH'
export const RESET = 'app/RESET'

// Action creators
export const fetchFreeAppPage = (page) => ({
  type: FETCH_FREE_APP_PAGE,
  page,
})

export const fetchFreeAppPageSuccess = (page, apps, ids) => ({
  type: FETCH_FREE_APP_PAGE_SUCCESS,
  page,
  apps,
  ids,
})

export const fetchFreeAppPageFailed = (page, error) => ({
  type: FETCH_FREE_APP_PAGE_FAILED,
  page,
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

export const search = (keyword) => ({
  type: SEARCH,
  keyword,
})

export const reset = () => ({
  type: RESET,
})
