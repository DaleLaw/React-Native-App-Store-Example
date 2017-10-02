import { combineReducers } from 'redux'
import configureStore from './CreateStore'
import rootSaga from '../Sagas/'
import FreeAppsReducer from './reducers/FreeAppsReducer'
import RecommendationsReducer from './reducers/RecommendationsReducer'
import SearchReducer from './reducers/SearchReducer'

export default () => {
  /* ------------- Assemble The Reducers ------------- */
  const rootReducer = combineReducers({
    nav: require('./NavigationRedux').reducer, // eslint-disable-line global-require
    freeApps: FreeAppsReducer, // eslint-disable-line global-require
    recommendations: RecommendationsReducer, // eslint-disable-line global-require
    search: SearchReducer, // eslint-disable-line global-require
  })

  return configureStore(rootReducer, rootSaga)
}
