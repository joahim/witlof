import React, { Component } from 'react';
import { findDOMNode } from 'react-dom';
import { DragSource, DropTarget } from 'react-dnd';
import classnames from 'classnames'
import { truncateWords } from '../../utils'

const ItemTypes = {
  CARD: 'card'
};

const childNodeSource = {
  beginDrag(props) {
    return {
      id: props.id,
      index: props.index
    }
  }
}

const childNodeTarget = {
  hover(props, monitor, component) {
    const dragIndex = monitor.getItem().index;
    const hoverIndex = props.index;

    // Don't replace items with themselves
    if (dragIndex === hoverIndex) {
      return;
    }

    // Determine rectangle on screen
    const hoverBoundingRect = findDOMNode(component).getBoundingClientRect();

    // Get vertical middle
    const hoverMiddleY = (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2;

    // Determine mouse position
    const clientOffset = monitor.getClientOffset();

    // Get pixels to the top
    const hoverClientY = clientOffset.y - hoverBoundingRect.top;

    // Only perform the move when the mouse has crossed half of the items height
    // When dragging downwards, only move when the cursor is below 50%
    // When dragging upwards, only move when the cursor is above 50%

    // Dragging downwards
    if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) {
      return;
    }

    // Dragging upwards
    if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) {
      return;
    }

    // Time to actually perform the action
    props.moveCard(dragIndex, hoverIndex);

    // Note: we're mutating the monitor item here!
    // Generally it's better to avoid mutations,
    // but it's good here for the sake of performance
    // to avoid expensive index searches.
    monitor.getItem().index = hoverIndex;
  }
}

class ChildNode extends Component {
  render() {

    const { isDragging, connectDragSource, connectDropTarget } = this.props
    // const opacity = isDragging ? 0 : 1

    return connectDragSource(connectDropTarget(
      <li className="child-node" className={classnames({'child-node': true, 'dragging': isDragging})}>
        <a href={'../' + this.props.id + '/'}>{truncateWords(this.props.title, 6)}</a>
      </li>
    ))
  }
}

var decoratedChildNode = DragSource(ItemTypes.CARD, childNodeSource, (connect, monitor) => ({
  connectDragSource: connect.dragSource(),
  isDragging: monitor.isDragging()
}))(ChildNode)

decoratedChildNode = DropTarget(ItemTypes.CARD, childNodeTarget, connect => ({
  connectDropTarget: connect.dropTarget()
}))(decoratedChildNode)

export default decoratedChildNode
