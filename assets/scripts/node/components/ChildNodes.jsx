import React, { Component } from 'react'

import { DragDropContext } from 'react-dnd';
import HTML5Backend from 'react-dnd-html5-backend';

import { swapChildNodePositions } from '../actions'
import ChildNode from './ChildNode'

class ChildNodes extends Component {
  render() {
    return (
      <div className="child-nodes-container">
        <h2>Child documents</h2>
        <a className="action add-new-child" href="./add/">Add a new child</a>
        {
          (this.props.children.size === 0) ?
            <p className="no-children">This document has no children.</p> :
            <ul className="child-nodes">
            {
              this.props.children.map((node, i) =>
                <ChildNode
                  key={node.get('id')}
                  id={node.get('id')}
                  index={i}
                  title={node.get('title')}
                  moveCard={this.moveCard.bind(this)} />
              )
            }
            </ul>
        }
      </div>
    )
  }

  moveCard(dragIndex, hoverIndex) {
    this.props.dispatch(swapChildNodePositions(
      this.props.nodeId,
      this.props.children.getIn([dragIndex, 'id']),
      this.props.children.getIn([hoverIndex, 'id'])
    ))
  }
}

export default DragDropContext(HTML5Backend)(ChildNodes);
