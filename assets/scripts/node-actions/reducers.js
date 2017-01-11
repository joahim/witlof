import Immutable from 'immutable';
import { List } from 'immutable';

const initialState =  Immutable.fromJS({
  parentNodeId: window.witlof.nodeId,
  nodeTreeSelector: {
    isFetching: false,
    selectedNodeId: null,
    tree: {
      id: 1,
      slug: '',
      title: 'Home',
      open: false,
      has_children: true,
    }
  }
})

function getParentPath(path) {
  var parentPath = List(['nodeTreeSelector', 'tree'])
  if (path.size > 0) {
    return parentPath.push('children').concat(path.interpose('children'))
  } else {
    return parentPath
  }
}

export default function main(state = initialState, action) {
  switch (action.type) {

    case 'REQUEST_CHILDREN':
      return state.setIn(['nodeTreeSelector', 'isFetching'], true)

    case 'RECEIVE_CHILDREN':
      return state.setIn(['nodeTreeSelector', 'isFetching'], false)
        .setIn(getParentPath(action.path).push('open').toJS(), true)
        .setIn(getParentPath(action.path).push('children').toJS(), Immutable.fromJS(action.data))

      case 'SELECT_NODE':
        return state.setIn(['nodeTreeSelector', 'selectedNodeId'], action.nodeId)

    case 'CLOSE_NODE':
      return state.setIn(getParentPath(action.path).push('open').toJS(), false)
        .setIn(getParentPath(action.path).push('children').toJS(), null)

    case 'REQUEST_NODE_MOVE':
      return state

    case 'RECEIVE_NODE_MOVE':
      window.location = action.url

    default:
      return state
  }
}
