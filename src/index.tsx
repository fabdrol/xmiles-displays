import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import Client from '@signalk/client'
import configureStore from './data/configure'
import { hydrateAction } from './data/ducks/signalk'

import './index.css'
import App from './gui/app'

const client = new Client({
  hostname: 'hq.decipher.digital',
  port: 3000,
  useTLS: false,
  useAuthentication: true,
  reconnect: true,
  autoConnect: true,
  username: 'sdk@decipher.industries',
  password: 'signalk'
})

const store = configureStore(client)

client.on('connect', () => {
  store.dispatch((hydrateAction as any)())
})

const Root = (
  <Provider store={store}>
    <App />
  </Provider>
)

ReactDOM.render(
  Root,
  document.getElementById('root') as HTMLElement
)
