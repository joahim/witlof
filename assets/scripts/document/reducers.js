import Immutable, { List, Map } from 'immutable';
import { getNextId } from '../utils'

export const initialState = Immutable.fromJS({
  document: {
      id: window.witlof.documentId,
      schema: undefined,
      data: {},
  }
})

export default function document(state=initialState, action) {

  switch (action.type) {

    case 'RECEIVE_DOCUMENT':
      return state
        .updateIn(['document', 'schema'], val => Immutable.fromJS(action.schema))
        .updateIn(['document', 'data'], val => assignDataListItemKeys(Immutable.fromJS(action.data ? action.data : {})))

    case 'ADD_ITEM':

      var schemaPath = List.of('document', 'schema').concat(action.schemaPath)
      var dataPath = List.of('document', 'data').concat(action.dataPath)

      var newItem = createDocumentElement(state, schemaPath, dataPath)
      if (state.getIn(dataPath) === undefined) {
        return state.setIn(dataPath, List.of(newItem))
      } else {
        return state.updateIn(dataPath, items => items.push(newItem))
      }

    case 'ADD_ITEM_ABOVE':

      var schemaPath = List.of('document', 'schema').concat(action.schemaPath)
      var dataPath = List.of('document', 'data').concat(action.dataPath)

      var newItem = createDocumentElement(state, schemaPath.pop(), dataPath.pop())
      var index = dataPath.last()

      return state.updateIn(dataPath.pop(), items =>
        List.of(
          items.take(index),
          List.of(newItem),
          items.slice(index)
        ).flatten(1)
      )

    case 'REMOVE_ITEM':

      var dataPath = List.of('document', 'data').concat(action.dataPath)
      return state.deleteIn(dataPath)

    case 'MOVE_ITEM_UP':

      var dataPath = List.of('document', 'data').concat(action.dataPath)
      return swapDocumentListItems(state, dataPath.pop(), dataPath.last() - 1)

    case 'MOVE_ITEM_DOWN':

      var dataPath = List.of('document', 'data').concat(action.dataPath)
      return swapDocumentListItems(state, dataPath.pop(), dataPath.last())

    case 'FIELD_VALUE_CHANGE':

      var dataPath = List.of('document', 'data').concat(action.dataPath)
      return state.updateIn(dataPath, value => Immutable.fromJS(action.newValue))

    default:
      return state
  }
}

function createDocumentElement(state, schemaPath, dataPath) {
  var fields = state.getIn(schemaPath).get('fields').map((field) => {
    switch (field.get('type')) {
      case 'ListField':
        return [field.get('name'), new List()]
      case 'ImageField':
      case 'FileField':
        return null
      default:
        return [field.get('name'), '']
    }
  })

  return new Map(fields.push(['_key', getNextId('item-')]))
}

function swapDocumentListItems(state, dataPath, atIndex) {
  return state.updateIn(dataPath, items =>
    List.of(
      items.take(atIndex),
      items.slice(atIndex+1, atIndex+2),
      items.slice(atIndex, atIndex+1),
      items.slice(atIndex+2)
    ).flatten(1)
  )
}

function assignDataListItemKeys(data) {
  return Map(List(data.entrySeq().map(item => {
    if (List.isList(item[1])) {
      return [item[0], item[1].map(assignDataListItemKeys)]
    } else {
      return [item[0], item[1]]
    }
  })).push(['_key', getNextId('item-')]))
}
