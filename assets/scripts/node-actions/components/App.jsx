import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import * as ActionCreators from '../actions'
import { Map } from 'immutable'

import MoveNode from './MoveNode'
import CopyNode from './CopyNode'
import DeleteNode from './DeleteNode'


class App extends Component {
  render() {

    const actions = bindActionCreators(ActionCreators, this.props.dispatch)

    return (
      <ul className="actions">
          <li><MoveNode {...this.props} actions={actions} /></li>
          <li><CopyNode {...this.props} actions={actions} /></li>
          <li><DeleteNode {...this.props} actions={actions} /></li>
      </ul>
    )
  }
}

App.propTypes = {
  parentNodeId: PropTypes.number.isRequired,
  nodeTreeSelector: PropTypes.instanceOf(Map)
}

export default connect(state => ({
  parentNodeId: state.get('parentNodeId'),
  nodeTreeSelector: state.get('nodeTreeSelector'),
}))(App)
