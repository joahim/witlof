import React, { Component } from 'react'
import { formatDateTime } from '../../utils'

import {
  deleteDocumentRevision,
  duplicateDocumentRevision,
  activateDocumentRevision,
  deactivateDocumentRevision,
} from '../actions'

export default class DocumentRevision extends Component {
  render() {
    return (
      this.props.revision.get('deleted') ? <Deleted {...this.props} /> : <InUse {...this.props} />
    )
  }
}

class Deleted extends Component {
  render() {
    return (
      <li>
        <div className="activate">&times;</div>
        <div className="revision">
          <span className="title">Revision {this.props.revision.get('revision')}</span>
          <div className="info">Deleted on {formatDateTime(this.props.revision.get('updated'))}</div>
        </div>
      </li>
    )
  }
}

class InUse extends Component {
  render() {
    const revision = this.props.revision
    return (
      <li>
        <div className="activate"><input type="radio" checked={revision.get('active')} onChange={this.handleActivate.bind(this)} /></div>
        <div className="revision">
          <a className="action action-navigation title" href={revision.get('url')}>Revision {revision.get('revision')}</a>
          <ul className="actions">
            <li><a className="action" href="#" onClick={(e) => this.handleDelete(e)}>Delete</a></li>
            <li><a className="action" href="#" onClick={(e) => this.handleDuplicate(e)}>Duplicate</a></li>
            <li><a className="action action-navigation" href={revision.get('preview_url')}>Preview</a></li>
          </ul>
          <div className="info">Last updated on {formatDateTime(revision.get('updated'))}, created on {formatDateTime(revision.get('created'))}</div>
        </div>
      </li>
    )
  }

  handleActivate(e) {
    if (this.props.revision.get('active')) {
      this.props.dispatch(deactivateDocumentRevision(this.props.nodeId, this.props.revision.get('id')))
    } else {
      this.props.dispatch(activateDocumentRevision(this.props.nodeId, this.props.revision.get('id')))
    }
  }

  handleDelete(e) {
    e.preventDefault()
    var ok = window.confirm('Are you sure you want to delete this document revision?')
    if (ok) {
      this.props.dispatch(deleteDocumentRevision(this.props.nodeId, this.props.revision.get('id')))
    }
  }

  handleDuplicate(e) {
    e.preventDefault()
    var ok = window.confirm('Are you sure you want to duplicate this document revision?')
    if (ok) {
      this.props.dispatch(duplicateDocumentRevision(this.props.nodeId, this.props.revision.get('id')))
    }
  }
}
