import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import Client from '@signalk/client'
import configureStore from './data/configure'
import { refresh } from './data/ducks/ui'
import { hydrateAction } from './data/ducks/signalk'

import {
  SK_HOST,
  SK_PORT
} from './config'

import './index.css'
import App from './gui/app'

const client = new Client({
  hostname: SK_HOST,
  port: SK_PORT,
  useTLS: false,
  useAuthentication: true,
  reconnect: true,
  autoConnect: true,
  username: 'sdk@decipher.industries',
  password: 'signalk'
})

const store = configureStore(client)
store.dispatch(refresh('starboard'))
client.on('connect', () => store.dispatch((hydrateAction as any)()))

const Root = (
  <Provider store={store}>
    <App />
  </Provider>
)

ReactDOM.render(
  Root,
  document.getElementById('root') as HTMLElement
)
