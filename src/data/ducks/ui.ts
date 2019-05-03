import { Reducer, Action, ActionCreator } from 'redux'
import API from '../../lib/api'
import { sleep } from '../../lib/utils'

import {
  call,
  put
} from 'redux-saga/effects'

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
  SET_WIDGETS = '@@ui/SET_WIDGETS',
  REFRESH = '@@ui/REFRESH'
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

export const refresh: ActionCreator<Action> = (payload:string = 'port') => {
  return {
    type: ActionTypes.REFRESH,
    payload
  }
}

export const UISagas = {
  refresh: function* refreshSaga (action:any) {
    const payload:string = action.payload
    
    try {
      const { data } = yield call(API.refresh, payload)
      yield put(setDisplayAction(data.display || 'sailsteer'))
      yield put(setWindTypeAction(data.windType || 'apparent'))
      yield put(setWidgetsAction(data.widgets || []))
    } catch (err) {
      // @TODO schedule next refresh
      console.log(`[UISagas/refresh] error: ${err.message}`)
    }

    yield sleep(5000)
    yield put(refresh(payload))
  }
}