import { fetchInit } from '../utils'

// ----------------------------------------------------------------------------
// Tree selector

export function openNode(parentNodeId, nodeId, path) {
  return function (dispatch) {
    dispatch(requestChildren())
    return fetch(`../../api/node/${nodeId}/children/${parentNodeId}/`, fetchInit('GET'))
      .then(response => response.json())
      .then(json => dispatch(receiveChildren(json.children, path))
    )
  }
}

export function closeNode(path) {
  return {
    type: 'CLOSE_NODE',
    path
  }
}

export function requestChildren() {
  return {
    type: 'REQUEST_CHILDREN'
  }
}

export function receiveChildren(data, path) {
  return {
    type: 'RECEIVE_CHILDREN',
    data,
    path
  }
}

export function selectNode(nodeId) {
  return {
    type: 'SELECT_NODE',
    nodeId
  }
}

// ----------------------------------------------------------------------------
// Move

export function moveNode(nodeId, targetNodeId) {
  return function (dispatch) {
    dispatch(requestNodeMove())
    return fetch(`../../api/node/${nodeId}/move/${targetNodeId}/`, fetchInit('POST'))
      .then(response => {
        if (response.ok) {
          return response.json()
        } else {
          return response.error()
        }
      })
      .then(json => dispatch(receiveNodeMove(json.url)))
      .catch(error => alert('Error moving node!'))
  }
}

export function requestNodeMove() {
  return {
    type: 'REQUEST_NODE_MOVE',
  }
}

export function receiveNodeMove(url) {
  return {
    type: 'RECEIVE_NODE_MOVE',
    url
  }
}

// ----------------------------------------------------------------------------
// Delete

export function deleteNode(nodeId) {
  return function (dispatch) {
    return fetch(`../../api/node/${nodeId}/`, fetchInit('DELETE'))
      .then(response => response.json())
      .then(json => {
        if (json.parentId !== null) {
          window.location.href = `../${json.parentId}/`
        }
      }
    )
  }
}
