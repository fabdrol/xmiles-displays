import {
  Store,
  createStore,
  applyMiddleware
} from 'redux'

import { composeWithDevTools } from 'redux-devtools-extension'
import { IApplicationState } from '../types'
import rootReducer, { initialState } from './ducks'

export {
  initialState
}

export default function configureStore(): Store<IApplicationState> {
  const composeEnhancers = composeWithDevTools({})
  return createStore(
    rootReducer,
    initialState,
    composeEnhancers(applyMiddleware())
  )
}
