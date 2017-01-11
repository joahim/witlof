import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

import * as ActionCreators from '../actions'
import { Document } from './Document'

class App extends Component {
  render() {
    if (this.props.document.get('schema') === undefined) {
      return (<div></div>)
    } else {
      return (
        <Document actions={bindActionCreators(ActionCreators, this.props.dispatch)}
          schema={this.props.document.get('schema')} data={this.props.document.get('data')}
        />
      )
    }
  }
}

App.propTypes = {
  document: PropTypes.object.isRequired
}

export default connect(state => ({
  document: state.get('document')
}))(App)
