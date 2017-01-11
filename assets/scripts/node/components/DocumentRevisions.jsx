import React, { Component } from 'react'

import DocumentRevision from './DocumentRevision'
import { createNewDocumentRevision } from '../actions'

export default class DocumentRevisions extends Component {
  render() {

    return (
      <div className="revisions-container">
        <h2>Document revisions</h2>
        <a className="action create-new-revision" href="#" onClick={this.handleAddNew.bind(this)}>Create a new revision</a>
        {
          (this.props.fetchedInitial && this.props.revisions.size === 0) ?
          <p>This document has no revisions.</p> :
          <DocumentRevisionList {...this.props} />
        }
      </div>
    )
  }

  handleAddNew(e) {
    e.preventDefault()
    this.props.dispatch(createNewDocumentRevision(this.props.nodeId))
  }
}

class DocumentRevisionList extends Component {
  render() {
    return (
      <ul className="revisions">
        {
          this.props.revisions.map(revision =>
            <DocumentRevision
              key={revision.get('id')}
              dispatch={this.props.dispatch}
              nodeId={this.props.nodeId}
              revision={revision}
            />)
        }
      </ul>
    )
  }
}
