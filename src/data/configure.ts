import {
  Store,
  createStore,
  applyMiddleware
} from 'redux'

import { composeWithDevTools } from 'redux-devtools-extension'
import thunk from 'redux-thunk'
import { IApplicationState } from '../types'
import rootReducer, { initialState } from './ducks'

export {
  initialState
}

export default function configureStore(signalk:any): Store<IApplicationState> {
  const composeEnhancers = composeWithDevTools({})
  return createStore(
    rootReducer,
    initialState,
    composeEnhancers(applyMiddleware(thunk.withExtraArgument(signalk)))
  )
}
