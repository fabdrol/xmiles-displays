import { Reducer, Action, ActionCreator } from 'redux'
import {
  IUIDuckState,
  EWindTypes,
  EDisplayTypes
} from '../../types'

export const initialState:IUIDuckState = {
  display: EDisplayTypes.SAILSTEER,
  windType: EWindTypes.TRUE,
  widgets: [
    'navigation.position',
    'navigation.speedThroughWater',
    'navigation.headingMagnetic',
    'navigation.courseOverGroundTrue',
    'navigation.speedOverGround',
    'navigation.courseOverGroundTrue',
    'navigation.speedOverGround'
  ]
}

export enum ActionTypes {
  RESET = '@@ui/RESET',
  SET_WIND_TYPE = '@@ui/SET_WIND_TYPE',
  SET_DISPLAY = '@@ui/SET_DISPLAY',
  SET_WIDGETS = '@@ui/SET_WIDGETS'
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

    case ActionTypes.SET_WIDGETS:
      return {
        ...state,
        widgets: payload
      }
    
    case ActionTypes.SET_DISPLAY:
      return {
        ...state,
        display: payload
      }

    case ActionTypes.SET_WIND_TYPE:
      return {
        ...state,
        windType: payload === 'true' ? EWindTypes.TRUE : EWindTypes.APPARENT
      }

    default:
      return {
        ...state
      }
  }
}

export const setWindTypeAction: ActionCreator<Action> = (payload:EWindTypes) => {
  return {
    type: ActionTypes.SET_WIND_TYPE,
    payload
  }
}

export const setDisplayAction: ActionCreator<Action> = (payload:EDisplayTypes) => {
  return {
    type: ActionTypes.SET_DISPLAY,
    payload
  }
}

export const setWidgetsAction: ActionCreator<Action> = (payload:string[]) => {
  return {
    type: ActionTypes.SET_WIDGETS,
    payload
  }
}
