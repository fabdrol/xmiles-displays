import { Reducer, Action, ActionCreator } from 'redux'
import { ThunkDispatch } from 'redux-thunk'
import { DateTime } from 'luxon'
import { IApplicationState, ISignalKDuckState, ISignalKDelta, ISignalKDeltaUpdate, ISignalKDeltaValue } from '../../types'
import { flatten } from '../../lib/utils'

export const initialState:ISignalKDuckState = {
  fetched: false,
  fetching: false,
  data: {}
}

export enum ActionTypes {
  RESET = '@@signalk/RESET',
  SET_PATH = '@@signalk/SET_PATH',
  HYDRATE = '@@signalk/HYDRATE',
  NOOP = '@@signalk/NOOP'
}

export const SignalKReducer: Reducer<ISignalKDuckState> = (state = initialState, action) => {
  const {
    type,
    payload
  } = action

  // if (type.startsWith('@@signalk')) {
  //   console.log(type, payload)
  // }

  switch (type) {
    case ActionTypes.RESET:
      return {
        ...initialState
      }

    case ActionTypes.HYDRATE:
      return {
        ...state,
        data: {
          ...payload
        }
      }

    case ActionTypes.SET_PATH:
      return {
        ...state,
        data: {
          ...state.data,
          [payload.path]: payload.value
        }
      }

    default:
      return {
        ...state
      }
  }
}

export function hydrateAction () {
  return async (dispatch: ThunkDispatch<IApplicationState, void, Action>, getState: () => IApplicationState, signalk:any) => {
    try {
      const api = await signalk.API()
      const self = await api.self()
      const payload = flatten(self)

      // Subscribe to changes
      subscribe(dispatch, signalk)
      
      return dispatch({
        type: ActionTypes.HYDRATE,
        payload
      })
    } catch (err) {
      console.log(`[signalk/hydrateAction] error: ${err.message}`)
    }
  }
}

export function handleValueUpdate (timestamp:DateTime, payload:ISignalKDeltaValue) {
  return async (dispatch: ThunkDispatch<IApplicationState, void, Action>, getState: () => IApplicationState, signalk:any) => {
    const now = DateTime.local()
    const age = now.diff(timestamp, 'seconds').as('seconds')

    /* @TODO
    if (age > 60) {
      return dispatch({ type: ActionTypes.NOOP })
    }
    // */

    return dispatch({
      type: ActionTypes.SET_PATH,
      payload
    })
  }
}

export function subscribe (dispatch: ThunkDispatch<IApplicationState, void, Action>, signalk:any, paths?:string[]):void {
  try {
    console.log(`[signalk/subscribe] unsubscribing`)
    signalk.removeListener('delta')
    signalk.unsubscribe()
  } catch (err) {
    console.log(`[signalk/subscribe] error unsubscribing`)
  }
  
  signalk.on('delta', (delta:ISignalKDelta) => {
    const { updates } = delta

    updates.forEach((update:ISignalKDeltaUpdate) => {
      const {
        timestamp,
        values
      } = update

      const time:DateTime = DateTime.fromISO(timestamp)

      values.forEach((value:ISignalKDeltaValue) => {
        dispatch(handleValueUpdate(time, value))
      })
    })
  })

  console.log(`[signalk/subscribe] subscribing`)
  if (!Array.isArray(paths) || paths.length === 0) {
    signalk.subscribe()
  } else {
    signalk.subscribe({
      context: 'vessels.self',
      subscribe: paths.map((path:string) => ({ path }))
    })
  }
}
