import { Reducer, Action, ActionCreator } from 'redux'
import { IApplicationState, IUIDuckState } from '../../types'

export const initialState:IUIDuckState = {
  connected: false
}

export enum ActionTypes {
  RESET = '@@auth/RESET'
}

export const UIReducer: Reducer<IUIDuckState> = (state = initialState, action) => {
  const {
    type,
    payload
  } = action

  switch (type) {
    case ActionTypes.RESET:
      return {
        ...initialState
      }

    default:
      return {
        ...state
      }
  }
}
