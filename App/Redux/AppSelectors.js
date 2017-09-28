import { createSelector } from 'reselect'

const selectAppDomain = () => (state) => state.app

const makeSelectGame = () => createSelector(
  selectAppDomain(),
  (substate) => substate.game
)

const makeSelectCurrentGame = () => createSelector(
  makeSelectGame(),
  (substate) => substate.present
)

const makeSelectHistory = () => createSelector(
  makeSelectGame(),
  (substate) => substate.past
)

export {
  selectAppDomain,
  makeSelectGame,
  makeSelectCurrentGame,
  makeSelectHistory,
}

export default selectAppDomain
