import Immutable from 'immutable';

const initialState =  Immutable.fromJS({
  isFetching: false,
  fetchedInitial: false,
  node: {},
  revisions: [],
  children: [],
})

export default function main(state = initialState, action) {

  switch (action.type) {

    case 'REQUEST_NODE':
      return state.set('isFetching', true)

    case 'RECEIVE_NODE':
      return state
        .set('isFetching', false)
        .set('fetchedInitial', true)
        .set('node', Immutable.fromJS(action.data.node))
        .set('revisions', Immutable.fromJS(action.data.revisions))
        .set('children', Immutable.fromJS(action.data.children))

    default:
      return state
  }
}
