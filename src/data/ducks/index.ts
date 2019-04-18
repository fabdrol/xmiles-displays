import { combineReducers, Dispatch, Action, AnyAction } from 'redux'
import { IApplicationState } from '../../types'

import { UIReducer, initialState as uiInitialState } from './ui'
import { SignalKReducer, initialState as skInitialState } from './signalk'

export const initialState:IApplicationState = {
  ui: uiInitialState,
  signalk: skInitialState
}

export default combineReducers<IApplicationState>({
  ui: UIReducer,
  signalk: SignalKReducer
})
