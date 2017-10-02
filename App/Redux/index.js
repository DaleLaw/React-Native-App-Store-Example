import { combineReducers } from 'redux'
import configureStore from './CreateStore'
import rootSaga from '../Sagas/'

export default () => {
  /* ------------- Assemble The Reducers ------------- */
  const rootReducer = combineReducers({
    nav: require('./NavigationRedux').reducer, // eslint-disable-line global-require
    freeApps: require('./reducers/FreeAppsReducer'), // eslint-disable-line global-require
    recommendations: require('./reducers/RecommendationsReducer'), // eslint-disable-line global-require
    search: require('./reducers/SearchReducer'), // eslint-disable-line global-require
  })

  return configureStore(rootReducer, rootSaga)
}
