import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import configureStore from './data/configure'

import './index.css'
import App from './gui/app'

const store = configureStore()
const Root = (
  <Provider store={store}>
    <App />
  </Provider>
)

ReactDOM.render(
  Root,
  document.getElementById('root') as HTMLElement
)
