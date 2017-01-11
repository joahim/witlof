import React, { Component, PropTypes } from 'react'
import { Map, List } from 'immutable';

import { Modal, ModalTitle, ModalBody, ModalFooter } from '../../components/Modal'


export default class MoveNode extends Component {

  render() {

    const { actions, parentNodeId, nodeTreeSelector } = this.props
    const selectedNodeId = nodeTreeSelector.get('selectedNodeId')

    return (
      <span>
        <button className="action" onClick={e => this.refs.moveModal.open()}>Move</button>

        <Modal ref="moveModal">
          <ModalTitle>Move document</ModalTitle>
          <ModalBody>
            <p>Please select the document where you want to move the current document:</p>
            <NodeTreeSelector actions={actions} parentNodeId={parentNodeId} selectedNodeId={selectedNodeId} tree={nodeTreeSelector.get('tree')} />
          </ModalBody>
          <ModalFooter>
            <button type="button" className="btn btn-secondary" data-dismiss="modal">Close</button>
            <button type="button" disabled={selectedNodeId==undefined} className="btn btn-primary" onClick={e => this.moveNode(parentNodeId, selectedNodeId)}>Move document</button>
          </ModalFooter>
        </Modal>
      </span>
    )
  }

  moveNode(parentNodeId, selectedNodeId) {
    this.refs.moveModal.close()
    this.props.actions.moveNode(parentNodeId, selectedNodeId)
  }
}

MoveNode.propTypes = {
  actions: PropTypes.objectOf(PropTypes.func).isRequired,
  parentNodeId: PropTypes.number.isRequired,
  nodeTreeSelector: PropTypes.instanceOf(Map).isRequired,
}


class NodeTreeSelector extends Component {

  render() {
    const { actions, parentNodeId, selectedNodeId, tree } = this.props

    return (
      <ul className="node-list">
        <Node key={tree.get('id')} actions={actions} parentNodeId={parentNodeId} selectedNodeId={selectedNodeId} path={List()} node={tree} />
      </ul>
    )
  }
}

NodeTreeSelector.propTypes = {
  actions: PropTypes.objectOf(PropTypes.func).isRequired,
  parentNodeId: PropTypes.number.isRequired,
  selectedNodeId: PropTypes.number,
  tree: PropTypes.instanceOf(Map),
}


class Node extends Component {

  render() {
    const { actions, parentNodeId, selectedNodeId, path, node } = this.props

    return (
      <li className="node">
        {node.get('can_move_or_copy_here') || node.get('id') == 1 ? <input type="radio" checked={node.get('id') == selectedNodeId} onChange={e => actions.selectNode(node.get('id'))} /> : null}
        {this.render_node(actions, parentNodeId, selectedNodeId, path, node)}
      </li>
    )
  }

  render_node(actions, parentNodeId, selectedNodeId, path, node) {

    const children = node.get('children')

    if (node.get('has_children') && (node.get('id') == 1 || node.get('can_move_or_copy_here'))) {
      return (
        <span>
          <button
            className="btn btn-link"
            onClick={e => node.get('open') ? actions.closeNode(path) : actions.openNode(parentNodeId, node.get('id'), path)}>
            {node.get('title')}
          </button>
          {node.get('open') && children ? <NodeList actions={actions} parentNodeId={parentNodeId} selectedNodeId={selectedNodeId} path={path} nodes={children} /> : null}
        </span>
      )
    } else {
      return <span>{node.get('title')}</span>
    }
  }
}

Node.propTypes = {
  actions: PropTypes.objectOf(PropTypes.func).isRequired,
  parentNodeId: PropTypes.number.isRequired,
  selectedNodeId: PropTypes.number,
  path: PropTypes.instanceOf(List),
  node: PropTypes.instanceOf(Map),
}


class NodeList extends Component {

  render() {
    const { actions, parentNodeId, selectedNodeId, path, nodes } = this.props

    return (
      <ul className="node-list">
        {nodes.map((node, i) =>
          <Node key={node.get('id')} actions={actions} parentNodeId={parentNodeId} selectedNodeId={selectedNodeId} path={path.push(i)} node={node} />)}
      </ul>
    )
  }
}

NodeTreeSelector.propTypes = {
  actions: PropTypes.objectOf(PropTypes.func).isRequired,
  parentNodeId: PropTypes.number.isRequired,
  selectedNodeId: PropTypes.number,
  path: PropTypes.instanceOf(List),
  nodes: PropTypes.instanceOf(List),
}
