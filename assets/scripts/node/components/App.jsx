import React, { Component } from 'react'
import { connect } from 'react-redux'

import Node from './Node'
import DocumentRevisions from './DocumentRevisions'
import ChildNodes from './ChildNodes'

class App extends Component {
  render() {
    return (
      <div className="row">
        <div className="col-lg-7">
          <Node
            dispatch={this.props.dispatch}
            nodeId={this.props.nodeId}
            isFetching={this.props.isFetching}
            node={this.props.node} />
          <DocumentRevisions
            dispatch={this.props.dispatch}
            nodeId={this.props.nodeId}
            fetchedInitial={this.props.fetchedInitial}
            revisions={this.props.revisions} />
        </div>
        <div className="col-lg-5">
          <ChildNodes
            dispatch={this.props.dispatch}
            nodeId={this.props.nodeId}
            children={this.props.children} />
        </div>
      </div>
    )
  }
}

export default connect(state => ({
  isFetching: state.get('isFetching'),
  fetchedInitial: state.get('fetchedInitial'),
  node: state.get('node'),
  revisions: state.get('revisions'),
  children: state.get('children'),
}))(App)
