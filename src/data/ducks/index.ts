import { combineReducers, Dispatch, Action, AnyAction } from 'redux'
import { IApplicationState } from '../../types'

import { UIReducer, initialState as uiInitialState } from './ui'

export const initialState:IApplicationState = {
  ui: uiInitialState
}

export default combineReducers<IApplicationState>({
  ui: UIReducer
})
