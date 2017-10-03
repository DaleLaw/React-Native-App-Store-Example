import _ from 'lodash'
import { call, put, select, all } from 'redux-saga/effects'
import API from '../Services/Api'
import {
  fetchTopFreeAppsSuccess,
  fetchTopFreeAppsFailed,
  fetchAppDetailsSuccess,
  fetchAppDetailsFailed,
  fetchRecommendationsSuccess,
  fetchRecommendationsFailed,
  loadNextPage,
} from '../Redux/actions'
import { makeSelectCurrentPageAppIds } from '../Redux/selectors/FreeAppsSelectors'
import FetchState from '../Constants/FetchState'

const api = API.create()

const RETRY_LIMIT = 5
// This function wraps another function in a for loop to retry
export function* autoRetry(func) {
  let error
  for (let i = 0; i < RETRY_LIMIT; i += 1) {
    try {
      const response = yield func
      if (response.ok) {
        return response
      }
    } catch (e) {
      error = e
    }
  }
  throw error
}

export function* fetchFreeApps() {
  try {
    const response = yield autoRetry(call(api.getTopFree))
    const entries = response.data.feed.entry
    const ids = _.map(entries, (e) => e.id.attributes['im:id'])
    const apps = _.mapValues(_.keyBy(entries, (e) => e.id.attributes['im:id']), (e) => ({
      img: e['im:image'][2].label,
      name: e['im:name'].label,
      category: e.category.attributes.label,
      fetchState: FetchState.NOT_FETCHED,
      error: null,
    }))
    yield put(fetchTopFreeAppsSuccess(apps, ids))
    // yield put(loadNextPage()) // Immediately load first page details
  } catch (e) {
    const message = e && e.message ? e.message : 'Unable to connect to server'
    yield put(fetchTopFreeAppsFailed(message))
  }
}

export function* fetchRecommendations() {
  try {
    const response = yield autoRetry(call(api.getRecommendations))
    const entries = response.data.feed.entry
    const ids = _.map(entries, (e) => e.id.attributes['im:id'])
    const apps = _.mapValues(_.keyBy(entries, (app) => app.id.attributes['im:id']), (app) => ({
      img: app['im:image'][2].label,
      name: app['im:name'].label,
      category: app.category.attributes.label,
      fetchState: FetchState.NOT_FETCHED,
      error: null,
    }))
    yield put(fetchRecommendationsSuccess(apps, ids))
  } catch (e) {
    const message = e && e.message ? e.message : 'Unable to connect to server'
    yield put(fetchRecommendationsFailed(message))
  }
}

export function* fetchAppDetails(appId) {
  try {
    const response = yield autoRetry(call(api.getAppDetails, appId))
    const result = response.data.results[0]
    const details = {
      averageUserRating: result.averageUserRating,
      userRatingCount: result.userRatingCount,
    }
    yield put(fetchAppDetailsSuccess(appId, details))
  } catch (e) {
    const message = e && e.message ? e.message : 'Unable to connect to server'
    yield put(fetchAppDetailsFailed(message))
  }
}

export function* loadNextPageSaga() {
  const ids = yield select(makeSelectCurrentPageAppIds())
  yield all(ids.map((id) => call(fetchAppDetails, id)))
}

export function* initAppListSaga() {
  yield all([call(fetchRecommendations), call(fetchFreeApps)])
}
