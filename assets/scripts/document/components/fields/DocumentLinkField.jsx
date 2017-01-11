import Immutable from 'immutable'
import React, { Component } from 'react'
import { fetchInit } from '../../../utils'
import SimpleField from './SimpleField'
import { id_of_path } from './utils'

export default class DocumentLinkField extends SimpleField {

  constructor(props) {
    super(props)
    // use timestamp to notify modal of change (reload state)
    this.state = { timestamp: Date.now() }
  }

  render_input(id, data, dataPath, actions) {
    return (
      <div>
        <Modal timestamp={this.state.timestamp} id={id} dataPath={dataPath} selectedNode={data ? data.toJS() : null} onSave={this.onModalSave.bind(this)} />
        <button className="btn btn-secondary btn-sm" onClick={e => this.handleClick(e)}>Select</button>
        <div className="document">
          {data ? data.get('title') : ''}
        </div>
      </div>
    )
  }

  onModalSave(e, value) {
    this.props.actions.fieldValueChange(this.props.dataPath, Immutable.fromJS(value))
    $('#' + id_of_path(this.props.dataPath)).modal('hide')
  }

  handleClick(e) {
    e.preventDefault()
    $('#' + id_of_path(this.props.dataPath)).modal({ backdrop: 'static' })
    this.setState(({timestamp}) => ({timestamp: Date.now()}))
  }
}

class Node extends Component {

  constructor(props) {
    super(props)
    this.state = {
      children: [],
    }
  }

  render() {
    var { modalId, selectValue, selectedNode, node} = this.props
    return (
      <li className="node">
        <input type="radio" name={modalId} checked={node.id === (selectedNode ? selectedNode.id : null)} onChange={e => this.props.selectValue(node)}/>
        <span><button className="btn btn-link" onClick={e => this.loadChildren(e, node.id)}>{node.title}</button></span>
        <NodeList modalId={modalId} selectValue={selectValue} selectedNode={selectedNode} nodes={this.state.children} />
      </li>
    )
  }

  loadChildren(e, nodeId) {
    e.preventDefault()
    fetch(`../../api/node/${nodeId}/`, fetchInit())
      .then(response => response.json())
      .then(json =>
        this.setState(({children}) => ({children: json.children}))
      )
  }
}

class NodeList extends Component {

  render() {
    var { modalId, selectValue, selectedNode, nodes } = this.props
    return (
      <ul className="node-list">
        {nodes.map(node =>
          <Node key={node.id} modalId={modalId} selectValue={selectValue} selectedNode={selectedNode} node={node} />)}
      </ul>
    )
  }
}

class Modal extends Component {

  constructor(props) {
    super(props)
    this.state = {
      node: null,
      selectedNode: null,
      timestamp: null,
    }
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.timestamp !== this.state.timestamp) {
      this.setState(({node}) => ({node: null}))
      this.setState(({selectedNode}) => ({selectedNode: this.props.selectedNode}))
      this.setState(({timestamp}) => ({timestamp: nextProps.timestamp}))
      fetch(`../../api/node/1/`, fetchInit())
        .then(response => response.json())
        .then(json => this.setState(({node}) => ({node: json})))
    }
  }

  render() {
    return (
      <div id={this.props.id} className="modal fade">
        <div className="modal-dialog" role="document">
          <div className="modal-content">
            <div className="modal-header">
              <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                <span aria-hidden="true">&times;</span>
              </button>
              <h4 className="modal-title">Modal title</h4>
            </div>
            <div className="modal-body">
              {this.state.node ?
                <Node modalId={this.props.id} selectValue={this.selectValue.bind(this)}
                  selectedNode={this.state.selectedNode} node={this.state.node.node} />
                : ''}
            </div>
            <div className="modal-footer">
              <button type="button" className="btn btn-secondary" data-dismiss="modal">Close</button>
              <button type="button" className="btn btn-primary" onClick={e => this.props.onSave(e, this.state.selectedNode)}>Save changes</button>
            </div>
          </div>
        </div>
      </div>
    )
  }

  selectValue(value) {
    if (this.state.selectedNode === null) {
        this.setState(({selectedNode}) => ({selectedNode: value}))
    } else {
        this.setState(({selectedNode}) => ({selectedNode: this.state.selectedNode.id === value.id ? null : value}))
    }
  }
}
