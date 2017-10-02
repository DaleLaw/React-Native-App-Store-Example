import { takeLatest } from 'redux-saga/effects'
import API from '../Services/Api'
import FixtureAPI from '../Services/FixtureApi'
import DebugConfig from '../Config/DebugConfig'

/* ------------- Types ------------- */

import { StartupTypes } from '../Redux/StartupRedux'
import { INIT_APP_LIST, LOAD_NEXT_PAGE } from '../Redux/actions'

/* ------------- Sagas ------------- */

import { startup } from './StartupSagas'
import { initAppListSaga, loadNextPageSaga } from './AppListSagas'

/* ------------- API ------------- */

// The API we use is only used from Sagas, so we create it here and pass along
// to the sagas which need it.
const api = DebugConfig.useFixtures ? FixtureAPI : API.create()

/* ------------- Connect Types To Sagas ------------- */

export default function* root() {
  yield [
    // some sagas only receive an action
    takeLatest(StartupTypes.STARTUP, startup),
    takeLatest(INIT_APP_LIST, initAppListSaga),
    takeLatest(LOAD_NEXT_PAGE, loadNextPageSaga),
  ]
}
