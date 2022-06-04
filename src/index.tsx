import React from 'react'
import { createRoot } from 'react-dom/client'
import { Provider } from 'react-redux'
import Client from '@signalk/client'
import configureStore from './data/configure'
import { refresh, setConnected } from './data/ducks/ui'
import { hydrateAction } from './data/ducks/signalk'

import {
  SK_HOST,
  SK_PORT,
  SK_USERNAME,
  SK_PASSWORD,
  SK_AUTH,
  IDENTITY
} from './config'

import './index.css'
import App from './gui/app'

const client = new Client({
  hostname: SK_HOST,
  port: SK_PORT,
  useAuthentication: false,
  useTLS: (SK_PORT === 443),
  reconnect: true,
  autoConnect: true,
  notifications: false
})

let ident = IDENTITY

const search = window.location.search
const store = configureStore(client)

if (search && typeof search === 'string' && search.startsWith('?identity=')) {
  ident = search.replace('?identity=', '').trim()
  ident = ident === '' ? IDENTITY : ident
}

if (ident !== 'port' && ident !== 'starboard') {
  ident = IDENTITY
}

console.log(`identity: ${ident}`)
store.dispatch(refresh(ident))

client.on('connect', () => {
  console.log('client.connect')
  
  client.authenticate(SK_USERNAME, SK_PASSWORD)
  client.once('authenticated', (data: any) => {
    console.log('client.authenticate', data)
    store.dispatch(setConnected(true))
    store.dispatch((hydrateAction as any)())
  })
})

client.on('disconnect', () => {
  console.log('client.disconnect')
  store.dispatch(setConnected(false))
})

const Root = (
  <Provider store={store}>
    <App />
  </Provider>
)

const container = document.getElementById('root')
const root = createRoot(container!)
root.render(Root)
