import '../utils'

import React from 'react'
import { render } from 'react-dom'

import { createStore, applyMiddleware } from 'redux'
import { Provider } from 'react-redux'
import thunkMiddleware from 'redux-thunk'

import App from './components/App'
import mainReducer from './reducers'

const createStoreWithMiddleware = applyMiddleware(thunkMiddleware)(createStore)

if (document.getElementById('node-actions-app')) {
  const store = createStoreWithMiddleware(mainReducer)
  render(<Provider store={store}><App /></Provider>, document.getElementById('node-actions-app'))
}
