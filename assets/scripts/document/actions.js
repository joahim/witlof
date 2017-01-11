import { fetchInit } from '../utils'

export function receiveDocument (doc) {
  return {
    type: 'RECEIVE_DOCUMENT',
    schema: doc.schema,
    data: doc.content
  }
}

export function fetchDocument(documentId) {
  return function (dispatch) {
    return fetch(`../../api/document/${documentId}/`, fetchInit())
      .then(response => response.json())
      .then(json => dispatch(receiveDocument(json)))
  }
}

export function addItem(dataPath, schemaPath) {
  return {
    type: 'ADD_ITEM',
    dataPath,
    schemaPath
  }
}

export function addItemAbove(dataPath, schemaPath) {
  return {
    type: 'ADD_ITEM_ABOVE',
    dataPath,
    schemaPath
  }
}

export function moveItemUp(dataPath) {
  return {
    type: 'MOVE_ITEM_UP',
    dataPath
  }
}

export function moveItemDown(dataPath) {
  return {
    type: 'MOVE_ITEM_DOWN',
    dataPath
  }
}

export function removeItem(dataPath) {
  return {
    type: 'REMOVE_ITEM',
    dataPath
  }
}

export function fieldValueChange(dataPath, newValue) {
  return {
    type: 'FIELD_VALUE_CHANGE',
    dataPath,
    newValue
  }
}

export function postImage(documentId, dataPath, file) {
  return function (dispatch) {
    var data = new FormData()
    data.append('file', file)
    return fetch(`../../api/document/${documentId}/image/`, fetchInit('POST', data))
      .then(response => response.json())
      .then(json => dispatch(fieldValueChange(dataPath, json)))
  }
}

export function postFile(documentId, dataPath, file) {
  return function (dispatch) {
    var data = new FormData()
    data.append('file', file)
    return fetch(`../../api/document/${documentId}/attachment/`, fetchInit('POST', data))
      .then(response => response.json())
      .then(json => dispatch(fieldValueChange(dataPath, json)))
  }
}
