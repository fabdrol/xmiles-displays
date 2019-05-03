import {
  Store,
  createStore,
  applyMiddleware
} from 'redux'

import createSagaMiddleware from 'redux-saga'
import thunk from 'redux-thunk'
import sagas from './sagas'
import { IApplicationState } from '../types'
import rootReducer, { initialState } from './ducks'

export { initialState }
export default function configureStore(signalk:any): Store<IApplicationState> {
  const sagaMiddleware = createSagaMiddleware()
  const store = createStore(
    rootReducer,
    initialState,
    applyMiddleware(
      sagaMiddleware,
      thunk.withExtraArgument(signalk)
    )
  )

  sagaMiddleware.run(sagas)
  return store
}
