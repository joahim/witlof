import '../utils'

import React from 'react'
import { render } from 'react-dom'

import { createStore, applyMiddleware } from 'redux'
import thunkMiddleware from 'redux-thunk'
import { Provider } from 'react-redux'

import Reducer, { initialState } from './reducers'
import App from './components/App'
import { fetchDocument } from './actions'

const createStoreWithMiddleware = applyMiddleware(thunkMiddleware)(createStore)

const store = createStoreWithMiddleware(Reducer, initialState)
store.dispatch(fetchDocument(store.getState().getIn(['document', 'id'])))

render(<Provider store={store}><App documentId={window.witlof.documentId} /></Provider>, document.getElementById('document-app'))
