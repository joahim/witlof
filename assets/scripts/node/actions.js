import { fetchInit } from '../utils'

// ----------------------------------------------------------------------------
// Node

export function requestNode () {
  return {
    type: 'REQUEST_NODE'
  }
}

export function receiveNode (data) {
  return {
    type: 'RECEIVE_NODE',
    data
  }
}

export function fetchNode(nodeId) {
  return function (dispatch) {
    dispatch(requestNode())
    return fetch(`../../api/node/${nodeId}/`, fetchInit())
      .then(response => response.json())
      .then(json => dispatch(receiveNode(json)))
  }
}

export function saveNodeMetadata(nodeId, metadata) {
  return function (dispatch) {
    return fetch(`../../api/node/${nodeId}/`, fetchInit('PUT', JSON.stringify(metadata)))
      .then(response => dispatch(fetchNode(nodeId)))
  }
}

// ----------------------------------------------------------------------------
// Revisions

export function createNewDocumentRevision(nodeId) {
  return function(dispatch) {
    return fetch(`../../api/node/${nodeId}/document/`, fetchInit('POST'))
      .then(response => dispatch(fetchNode(nodeId)))
  }
}

export function deleteDocumentRevision(nodeId, documentId) {
  return function(dispatch) {
    return fetch(`../../api/document/${documentId}/`, fetchInit('DELETE'))
      .then(response => dispatch(fetchNode(nodeId)))
  }
}

export function duplicateDocumentRevision(nodeId, documentId) {
  return function(dispatch) {
    return fetch(`../../api/document/${documentId}/duplicate/`, fetchInit('POST'))
      .then(response => dispatch(fetchNode(nodeId)))
  }
}

export function activateDocumentRevision(nodeId, documentId) {
  return function(dispatch) {
    return fetch(`../../api/document/${documentId}/activate/`, fetchInit('PUT'))
      .then(response => dispatch(fetchNode(nodeId)))
  }
}

export function deactivateDocumentRevision(nodeId, documentId) {
  return function(dispatch) {
    return fetch(`../../api/document/${documentId}/deactivate/`, fetchInit('PUT'))
      .then(response => dispatch(fetchNode(nodeId)))
  }
}

// ----------------------------------------------------------------------------
// Child nodes

export function createNewNodeChild(nodeId) {
  return function(dispatch) {
    return fetch(`../../api/node/${nodeId}/child/`, fetchInit('POST'))
      .then(response => dispatch(fetchNode(nodeId)))
  }
}

export function swapChildNodePositions(nodeId, firstChildNodeId, secondChildNodeId) {
  return function (dispatch) {
    return fetch(`../../api/node/${firstChildNodeId}/swap-positions/${secondChildNodeId}/`, fetchInit('PUT'))
      .then(response => dispatch(fetchNode(nodeId)))
  }
}

// ----------------------------------------------------------------------------
