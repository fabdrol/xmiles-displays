import { takeLatest } from 'redux-saga/effects'

import {
  ActionTypes as UIActionTypes,
  UISagas
} from './ducks/ui'

export default function* run() {
  yield takeLatest(UIActionTypes.REFRESH, UISagas.refresh)
}
