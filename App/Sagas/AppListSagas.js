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
      if (!response.ok) {
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
    const apps = _.keyBy(entries, (e) => e.id.attributes['im:id']).map((e) => ({
      img: e['im:image'][2].label,
      name: e['im:name'].label,
      category: e.category.attributes.label,
      fetchState: FetchState.NOT_FETCHED,
      error: null,
    }))
    yield put(fetchTopFreeAppsSuccess(apps, ids))
  } catch (e) {
    yield put(fetchTopFreeAppsFailed(e.message))
  }
}

export function* fetchRecommendations() {
  try {
    const response = yield autoRetry(call(api.getRecommendations))
    const entries = response.data.feed.entry
    const ids = _.map(entries, (e) => e.id.attributes['im:id'])
    const apps = _.keyBy(entries, (e) => e.id.attributes['im:id']).map((e) => ({
      img: e['im:image'][2].label,
      name: e['im:name'].label,
      category: e.category.attributes.label,
      fetchState: FetchState.NOT_FETCHED,
      error: null,
    }))
    yield put(fetchRecommendationsSuccess(apps, ids))
  } catch (e) {
    yield put(fetchRecommendationsFailed(e.message))
  }
}

export function* fetchAppDetails(appId) {
  try {
    const response = yield autoRetry(call(api.getAppDetails, appId))
    const result = response.data.result
    const details = {
      averageUserRating: result.averageuserRating,
      userRatingCount: result.userRatingCount,
    }
    yield put(fetchAppDetailsSuccess(appId, details))
  } catch (e) {
    yield put(fetchAppDetailsFailed(e.message))
  }
}

export function* loadNextPageSaga() {
  const ids = yield select(makeSelectCurrentPageAppIds())
  yield all(ids.map((id) => autoRetry(call(fetchAppDetails(id)))))
}

export function* initAppListSaga() {
  yield all(call(fetchRecommendations), call(fetchFreeApps))
  yield put(loadNextPage()) // Immediately load first page details
}