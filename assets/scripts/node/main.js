import '../utils'

import React from 'react'
import { render } from 'react-dom'

import { createStore, applyMiddleware } from 'redux'
import { Provider } from 'react-redux'
import thunkMiddleware from 'redux-thunk'

import App from './components/App'
import mainReducer from './reducers'
import { fetchNode } from './actions'

const createStoreWithMiddleware = applyMiddleware(thunkMiddleware)(createStore)

if (document.getElementById('node-app')) {
  const store = createStoreWithMiddleware(mainReducer)
  store.dispatch(fetchNode(window.witlof.nodeId))
  render(<Provider store={store}><App nodeId={window.witlof.nodeId} /></Provider>, document.getElementById('node-app'))
}
